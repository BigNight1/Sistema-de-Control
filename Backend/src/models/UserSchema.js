import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  user: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
