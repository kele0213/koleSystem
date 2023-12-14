const Router = require("koa-router");
const {
  checkAuth,
  checkAuthorPermission,
} = require("../middlewares/auth.middleware");

const LabelController = require("../controllers/label.controller")

const labelRouter = new Router({ prefix: "/label" });

labelRouter.post("/",checkAuth,LabelController.create);
// 获取所有标签
labelRouter.get('/',LabelController.getAllLabels)
// 获取动态标签
labelRouter.get('/:momentId',LabelController.getLabelByMomentId)

module.exports = labelRouter;
