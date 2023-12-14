const Router = require("koa-router");
const {
  checkAuth,
  checkAuthorPermission,
} = require("../middlewares/auth.middleware");
const { getCurrentComment } = require("../middlewares/comment.middleware");
const commentController = require("../controllers/comment.controller");

const commentRouter = new Router({ prefix: "/comment" });

// 发表评论
commentRouter.post("/", checkAuth, commentController.create);
// 回复评论
commentRouter.post(
  "/:commentId/reply",
  checkAuth,
  getCurrentComment,
  commentController.reply
);
// 更新评论
commentRouter.patch(
  "/:commentId",
  checkAuth,
  checkAuthorPermission,
  commentController.update
);
// 删除评论
commentRouter.delete(
  "/:commentId",
  checkAuth,
  checkAuthorPermission,
  commentController.delete
);
// 根据动态ID获取评论
commentRouter.get("/", commentController.getCommentByMomentId);

module.exports = commentRouter;
