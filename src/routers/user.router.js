const Router = require("koa-router");
const userController = require("../controllers/user.controller");

const {
  checkUser,
  passwordEncrypt,
  getAvatar,
} = require("../middlewares/user.middleware");

const userRouter = new Router({ prefix: "/user" });

// 注册接口
userRouter.post(
  "/register",
  checkUser,
  passwordEncrypt,
  userController.register
);

// 登录接口在鉴权auth那边
// 查看头像
userRouter.get("/:userId/avatar", getAvatar, userController.viewAvatar);

module.exports = userRouter;
