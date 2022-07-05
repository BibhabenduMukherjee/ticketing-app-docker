import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
//import {body} from 'express-validator';
import { Request, Response } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { BadRequestError } from "../error/bad-request-error";
import "express-async-errors";
import { User } from "../models/user";
//import { NextFunction } from "express";

// use express-validator as a middleware in the route

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
      //next(new RequestValidationError(errors.array()));
    }

    const { email, password } = req.body;
    console.log(email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
      //return res.send({});
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
