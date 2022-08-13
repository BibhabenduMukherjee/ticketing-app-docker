import mongoose from "mongoose";
import { app } from "./app";

// connect to mongo cluster

const start = async () => {
  // it's not in localhost rather it stays to the kubernetes cluster we need to somehow connect to the cluster for that we use cluster-ip service
  if (!process.env.JWT_KEY) {
    throw new Error("JWT KEY MUST BEEN DEFIEND");
  }
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
