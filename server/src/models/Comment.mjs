import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  text: String,
  date: String,
});

export default model("Comment", commentSchema);
