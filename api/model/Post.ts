import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
