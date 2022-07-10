import express from "express";
import { body } from "express-validator";
const router = express.Router();
import jwt from "jsonwebtoken";
//import {body} from 'express-validator';
import { Request, Response } from "express";
import { BadRequestError } from "../error/bad-request-error";
import "express-async-errors";
import { User } from "../models/user";
import { validateRequest } from "../middleware/validate-request";
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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
      //return res.send({});
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate Jwt

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store and send to client
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

//10 60 50 93 99 95 90 125 135 130 180 250 200 150 100
