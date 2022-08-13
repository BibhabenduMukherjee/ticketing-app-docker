import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { currentUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

// this route handler is for knowing there is any logged user or not if user is log in then he/she has a valid cookie as a request session on browser
// we check that req.session object is present or not if present then we try to verify using our secret key and extract the payload

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  // req.currentUser is a arbitrary property create by dev>
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
