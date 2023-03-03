import express from "express";
import mongoose from "mongoose";
import Post from "../model/Post";
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

postRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const datetime = new Date().toISOString();

  const PostData = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
    datetime,
  };

  const NewObjectPost = new Post(PostData);

  try {
    await NewObjectPost.save();
    return res.send(NewObjectPost);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default postRouter;
