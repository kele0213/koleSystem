const Router = require("koa-router");
const {
  checkAuth,
  checkAuthorPermission,
} = require("../middlewares/auth.middleware");
const {
  uploadAvatar,
  uploadPicture,
  picResize,
} = require("../middlewares/file.middleware");
const fileController = require("../controllers/file.controller");
const fileRouter = new Router({ prefix: "/upload" });

// 上传头像
fileRouter.post("/avatar", checkAuth, uploadAvatar, fileController.saveAvatar);

// 上传照片
fileRouter.post(
  "/picture/:momentId",
  checkAuth,
  checkAuthorPermission,
  uploadPicture,
  picResize, //传入三个不同大小的图片
  fileController.savePicture
);

module.exports = fileRouter;
