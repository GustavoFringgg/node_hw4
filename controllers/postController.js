const Post = require("../model/posts"); //模組化Post 使用大寫
const User = require("../model/users"); //模組化User 使用大寫
const handleSuccess = require("../utils/handleSuccess");
const handleError = require("../utils/handleError");
const express = require("express");
const mongoose = require("mongoose");
const posts = {
  async getPosts(req, res, next) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"; //由舊到新搜尋
    const q =
      req.query.q !== undefined
        ? { content: new RegExp(req.query.q, "i") }
        : {};

    const post = await Post.find(q)
      .populate({
        path: "user", //指向Post model裡頭的user欄位
        select: "name photo ",
      })
      .sort(timeSort);

    if (post.length !== 0) {
      handleSuccess(res, post, `目前共有${post.length}則貼文`);
    } else handleSuccess(res, "尚未有任何貼文");
  },

  async postPosts(req, res, next) {
    try {
      const { body } = req;
      if (body && body.content != undefined && body.content.trim()) {
        const new_post = await Post.create(req.body);
        handleSuccess(res, "新增貼文成功", new_post);
      } else {
        handleError(res, "欄位填寫錯誤");
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteAllposts(req, res, next) {
    if (req.originalUrl === "/posts/") {
      handleError(res, "請輸入正確url");
    } else {
      await Post.deleteMany();
      handleSuccess(res, "貼文已全部刪除");
    }
  },
  async deletePosts(req, res, next) {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        handleError(res, "無效的ID格式");
        return;
      }
      let delete_data = await Post.findById(id);
      if (delete_data) {
        await Post.findByIdAndDelete(id);
        handleSuccess(res, `${delete_data.name}的貼文已被刪除`);
      } else {
        handleError(res, "查無此ID");
      }
    } catch (error) {
      next(error);
    }
  },

  async updatePosts(req, res, next) {
    try {
      const { body } = req;
      if (!body.name) {
        return handleError(res, "貼文姓名未填寫");
      }
      if (body && body.content != undefined && body.content.trim()) {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return handleError(res, "無效的ID格式");
        }
        const Patch_data = await Post.findById(id); //Patch_data 整個物件
        if (Patch_data) {
          const new_post = await Post.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          handleSuccess(res, `${new_post.name}的貼文已被更新`, new_post);
        } else {
          handleError(res, "查無此ID");
        }
      } else {
        handleError(res, "貼文未填寫");
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = posts;
