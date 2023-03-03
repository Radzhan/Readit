import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import userRouter from "./router/User";
import postRouter from "./router/Post";
import commentRouter from "./router/Comment";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts", commentRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  app.use(express.static("public"));
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
