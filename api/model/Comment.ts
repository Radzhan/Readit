import mongoose, { Types } from "mongoose";
import Post from "./Post";
import User from "./User";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist",
    },
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Post.findById(value),
      message: "Post does not exist",
    },
  },
  text: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
