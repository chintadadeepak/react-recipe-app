// defining how should our users collection look like..
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // the recipes saved by the current logged in user.
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes",
      required: true,
    },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
