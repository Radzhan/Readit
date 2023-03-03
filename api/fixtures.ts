import crypto, { randomUUID } from "crypto";
import mongoose from "mongoose";
import config from "./config";
import Comment from "./model/Comment";
import Post from "./model/Post";
import User from "./model/User";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("comments");
    await db.dropCollection("posts");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [first, second] = await User.create(
    {
      username: "Doe",
      password: "1234",
      name: 'pupkin',
      token: randomUUID(),
    },
    {
      username: "Vasy",
      password: "4321",
      name: 'nagibator',
      token: randomUUID(),
    }
  );

  const [post1, post2] = await Post.create(
    {
      title: "The Eminem Show",
      description: "some desc",
      datetime: new Date().toISOString(),
      image: null,
    },
    {
      title: "The Marshall Mathers LP",
      description: "some desc",
      datetime: new Date().toISOString(),
      image: null,
    }
  );

  await Comment.create(
    {
      user: first._id,
      post: post1._id,
      text: 'another text',
    },
    {
      user: first._id,
      post: post1._id,
      text: 'some text',
    },
    {
      user: second._id,
      post: post2._id,
      text: 'some text',
    },
    {
      user: second._id,
      post: post2._id,
      text: 'another text',
    }
  );

  await db.close();
};

run().catch(console.error);
