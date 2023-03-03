import express from "express";
import mongoose from "mongoose";
import Comment from "../model/Comment";
const commentRouter = express.Router();

commentRouter.get("/", async (req, res, next) => {
  try {
    const result = await Comment.find();

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

commentRouter.post(
  "/",
  async (req, res, next) => {
    const CommentData = {
      user: req.body.user,
      post: req.body.post,
      text: req.body.text,
    };

    const NewObjectComment = new Comment(CommentData);

    try {
      await NewObjectComment.save();
      return res.send(NewObjectComment);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.sendStatus(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

export default commentRouter;
