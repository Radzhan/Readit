import express from "express";
import mongoose from "mongoose";
import auth, { RequestWithUser } from "../midellware/auth";
import Comment from "../model/Comment";
import User from "../model/User";
import { CommentI } from "../types";
const commentRouter = express.Router();

commentRouter.get("/:id", async (req, res, next) => {
  try {
    const array: CommentI[] = [];
    const result = await Comment.find({ post: req.params.id });
    for (let i = 0; i < result.length; i++) {
      const user = await User.findById(result[i].user);
      const object = {
        text: result[i].text,
        name: user!.name,
        _id: String(result[i]._id),
      };

      array.push(object);
    }

    return res.send(array);
  } catch (e) {
    return next(e);
  }
});

commentRouter.post("/:id", auth, async (req, res, next) => {
  const object = (req as RequestWithUser).user;
  const id = req.params.id;
  const CommentData = {
    text: req.body.text,
    post: id,
    user: object._id,
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
});

export default commentRouter;
