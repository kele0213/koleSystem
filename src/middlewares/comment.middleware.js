const { getCommentById } = require("../services/comment.services");

//  根据评论ID获取评论 用于：回复评论
async function getCurrentComment(ctx, next) {
  const { commentId } = ctx.request.params;
  const res = await getCommentById(commentId);
  ctx.currentComment = res;
  await next();
}

module.exports = { getCurrentComment };
