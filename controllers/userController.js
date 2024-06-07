const Post = require("../model/posts"); //模組化Post 使用大寫
const User = require("../model/users"); //模組化User 使用大寫
const handleSuccess = require("../utils/handleSuccess");
const handleError = require("../utils/handleError");
const express = require("express");
const mongoose = require("mongoose");

const users = {
  async getUsers(req, res, next) {
    const users = await User.find();

    if (users.length !== 0) {
      handleSuccess(res, users, `目前共有${users.length}筆會員`);
    } else handleSuccess(res, "目前沒有會員");
  },
};
module.exports = users;
