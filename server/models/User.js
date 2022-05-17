//mongoose
import mongoose from "mongoose";

//Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

//model
const User = mongoose.model("User", userSchema);

//exports
export default User;
