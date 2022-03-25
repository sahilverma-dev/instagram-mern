const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  caption: {
    type: String,
    required: [true, "Caption is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: [true, "Comment is required"],
      },
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      avatar: {
        type: String,
        required: [true, "Avatar is required"],
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {
  Post: model("Post", PostSchema),
};
