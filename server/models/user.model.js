const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    link: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "Normal User",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      default:
        "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
    },
    bio: {
      type: String,
      default: "Hey there! I am new in this Instagram clone.",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = { User: model("User", UserSchema) };
