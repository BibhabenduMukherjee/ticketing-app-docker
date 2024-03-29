export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];
  constructor(message: string) {
    super(message);
    // set setPrototypeOf

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}


/* 



a = {
  name : "Souvik",
  age : 21
}

[ 
  {mess : , field}
  {mess }
  {}
  {}
  {}
  {}
  {}
  {}
  {}
  {}
  {}
  {}
  {}
  {}
  {}
]

*/