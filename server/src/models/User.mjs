import { model, Schema } from "mongoose";

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: String,
  password: String,
  token: String,
  email: String,
  createdAt: Date,
});

export default model("User", userSchema);
