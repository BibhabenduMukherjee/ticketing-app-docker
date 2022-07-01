import express from "express";
import { json } from "body-parser";
const app = express();
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFound } from "./error/not-found-error";
import "express-async-errors";
import mongoose from "mongoose";
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new NotFound();
});

app.use(errorHandler);

// connect to mongo cluster

const start = async () => {
  // it's not in localhost rather it stays to the kubernetes cluster we need to somehow connect to the cluster for that we use cluster-ip service

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connection successful");
  } catch (e) {
    console.log("No coonection");
  }
};
start();
app.listen(3000, () => {
  console.log("listening on port 3000!");
});
