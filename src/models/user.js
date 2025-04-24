import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {},
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.user || model("user", userSchema);
export default User;
