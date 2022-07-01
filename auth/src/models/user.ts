import mongoose from "mongoose";

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

// represents entire collection a way to connect
// application-> database's collection
//& args (<nameOfModel> Required , <SchemaName> Required)
const User = mongoose.model("User", userSchema);

//^ maintain a solid rule the problem is
// typescripts has no idea which arguments we are send
// to User() we can make a typo or add more field

export { User };
