import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default model("Comment", commentSchema);
