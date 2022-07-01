import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
//import {body} from 'express-validator';
import { Request, Response } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-errors";

// use express-validator as a middleware in the route
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("Password must be valid"),
  ],
  // now we should send the validate result or message to the user using validationResult
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // do not manually solve the error
      // throw a error
      //return res.status(400).send(errors.array());

      throw new RequestValidationError(errors.array());
    }

    console.log("creating a user");
    throw new DatabaseConnectionError();

    res.send("user created successfully");
  }
);

export { router as signupRouter };
