import express from "express";
import mongoose from "mongoose";
import Post from "../model/Post";
import { imagesUpload } from "../multer";
const PostRouter = express.Router();

PostRouter.get("/", async (req, res, next) => {
  try {
    const result = await Post.find();

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

PostRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const PostData = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
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

export default PostRouter;
