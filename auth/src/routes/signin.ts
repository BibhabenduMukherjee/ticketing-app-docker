import express from "express";
import { body } from "express-validator";
import { Request, Response } from "express";
import { validateRequest } from "../middleware/validate-request";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must apply a password"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send("Hello form express");
  }
);

export { router as signinRouter };
