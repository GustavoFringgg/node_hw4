const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user", //model的名稱
      required: [true, "貼文姓名未填寫"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: [true, "Content 未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
const Post = mongoose.model("Postmodel", postSchema);

module.exports = Post;
