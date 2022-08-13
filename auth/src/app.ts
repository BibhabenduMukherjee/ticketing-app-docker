import express from "express";
import { json } from "body-parser";
const app = express();
import { currentUserRouter } from "./routes/current-user";
import cookieSession from "cookie-session";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFound } from "./error/not-found-error";
import "express-async-errors";

//* This is just initializing the express server ;
//! we have access of this server -> and do some test using supertest

app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new NotFound();
});

app.use(errorHandler);
export { app };
