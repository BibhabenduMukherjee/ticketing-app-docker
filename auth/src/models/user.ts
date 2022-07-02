import mongoose from "mongoose";

// An Interface that describes the properties
// that are required eo create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An Interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}

// structure of the data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//adding a static properties to a model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// user model
const User = mongoose.model<any, UserModel>("User", userSchema);

// User.build is for creating a new User
// with proper type checking
User.build({
  email: "test@test.com",
  password: "password",
});

export { User };
