import express from "express";
import mongoose from "mongoose";
import auth, { RequestWithUser } from "../midellware/auth";
import Post from "../model/Post";
import User from "../model/User";
import { imagesUpload } from "../multer";
const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  try {
    const result = await Post.find().sort({ datetime: -1 });

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);

    if (!result) {
      return res.sendStatus(404);
    }

    return res.send(result);
  } catch {
    res.sendStatus(500);
  }
});

postRouter.post(
  "/",
  imagesUpload.single("image"),
  auth,
  async (req, res, next) => {
    const datetime = new Date().toISOString();
    const object = (req as RequestWithUser).user;
    const user = await User.findOne({ token: object.token });

    if (!user) {
      return res.status(403).send({ error: "user not found" });
    }

    const PostData = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      datetime,
    };

    const NewObjectPost = new Post(PostData);

    try {
      if (req.file?.filename !== null || req.body.description !== "") {
        await NewObjectPost.save();
        return res.send(NewObjectPost);
      } else {
        res.status(400).send({error : 'image or description are required'})
      }
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.sendStatus(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

export default postRouter;
