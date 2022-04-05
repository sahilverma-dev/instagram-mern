const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
    },
    image: {
      original: {
        type: String,
        required: [true, "Image is required"],
      },
      medium: {
        type: String,
        required: [true, "Image is required"],
      },
      thumbnail: {
        type: String,
        required: [true, "Image is required"],
      },
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
        comment: {
          type: String,
          required: [true, "Comment is required"],
        },
        commentedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

module.exports = {
  Post: model("Post", PostSchema),
};
