import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  panNumber: { type: String, required: true },
  kycDocument: { type: String }, // path to uploaded file
});

export default mongoose.model("User", userSchema);
