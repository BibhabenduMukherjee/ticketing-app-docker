import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
interface userPayload {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payLoad = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payLoad;
    console.log(payLoad)
    
  } catch (err) {}
  next();
};
