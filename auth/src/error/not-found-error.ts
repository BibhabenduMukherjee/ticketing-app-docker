import { CustomError } from "./custom-error";

export class NotFound extends CustomError {
  statusCode = 500;
  constructor() {
    super("not found");
    Object.setPrototypeOf(this, NotFound.prototype);
  }
  serializeErrors() {
    return [{ message: "Not found " }];
  }
}
