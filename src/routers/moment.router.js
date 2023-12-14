const Router = require("koa-router");

const momentController = require("../controllers/moment.controller");
const {
  checkAuth,
  checkAuthorPermission,
} = require("../middlewares/auth.middleware");
const { createLabels } = require("../middlewares/moment.middleware");

const momentRouter = new Router({ prefix: "/moments" });
// 创建动态
momentRouter.post("/", checkAuth, momentController.create);
// 查询动态
momentRouter.get("/:momentId", momentController.getMoment);
// 查询动态详情
momentRouter.get("/detail/:momentId", momentController.getMomentDetail);
// 全部查询
momentRouter.get("/", momentController.getAllMoment);
// 修改
momentRouter.patch(
  "/update/:momentId",
  checkAuth,
  checkAuthorPermission,
  momentController.updateMoment
);
// 删除
momentRouter.delete(
  "/delete/:momentId",
  checkAuth,
  checkAuthorPermission,
  momentController.deleteMoment
);
// 给动态添加标签
momentRouter.post(
  "/:momentId/label",
  checkAuth,
  checkAuthorPermission,
  createLabels, // 检测标签是否存在
  momentController.addLabels
);

// 查看动态的图片
momentRouter.get("/pics/:filename", momentController.viewPicture);

module.exports = momentRouter;
