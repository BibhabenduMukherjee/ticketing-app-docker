import express from "express";
import { body } from "express-validator";
import { Request, Response } from "express";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
const router = express.Router();
import "express-async-errors";
import { BadRequestError } from "../error/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must apply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credential Provided");
    }
    // res.send(existingUser);
    const passwordMatched = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatched) {
      throw new BadRequestError("Incorrect Credential");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store and send to client
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
