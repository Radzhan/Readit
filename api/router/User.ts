import express from "express";
import mongoose from "mongoose";
import User from "../model/User";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

userRouter.post("/sessions", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: "Password is wrong" });
  }
  try {
    user.generateToken();
    await user.save();
    return res.send({ message: "Username and password correct!", user });
  } catch (e) {
    return next(e);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
    try {
      const token = req.get('Authorization');
      const success = {message: 'OK'};
  
      if (!token) {
        return res.send(success);
      }
  
      const user = await User.findOne({token});
  
      if (!user) {
        return res.send(success);
      }
  
      user.generateToken();
      await user.save();
      return res.send(success);
    } catch (e) {
      return next(e);
    }
  })

export default userRouter;
