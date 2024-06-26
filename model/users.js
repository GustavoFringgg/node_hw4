const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //去除前後空格
    required: [true, "請輸入您的名字"],
  },
  email: {
    type: String,
    trim: true, //去除前後空格
    required: [true, "請輸入您的 Email"],
    unique: true, //唯一資料表，不允許重複
    lowercase: true, //將email自動轉為小寫
    select: false,
    // select為false代表建立這個屬性，但不會被find()找出來而具保護效果
    // select作用範圍僅限於Node.js後端的查詢，對於其他非Node.js環境或工具可能不具有效性
  },
  photo: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
