const commentServices = require("../services/comment.services");

class CommentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const { momentId, content } = ctx.request.body;
    const res = await commentServices.create(momentId, content, userId);
    ctx.body = res;
  }

  async reply(ctx, next) {
    const userId = ctx.user.id;
    const { momentId } = ctx.currentComment;
    const { content } = ctx.request.body;
    const { commentId } = ctx.request.params;
    const res = await commentServices.reply(
      momentId,
      content,
      userId,
      commentId
    );
    ctx.body = res;
  }

  async update(ctx, next) {
    const { content } = ctx.request.body;
    const { commentId } = ctx.request.params;
    const res = await commentServices.update(commentId, content);
    ctx.body = res;
  }

  async delete(ctx, next) {
    const { commentId } = ctx.request.params;
    const res = await commentServices.delete(commentId);
    ctx.body = res;
  }
  async getCommentByMomentId(ctx, next) {
    const { momentId } = ctx.request.query;
    const res = await commentServices.getCommentByMomentId(momentId);
    ctx.body = res;
  }
}

module.exports = new CommentController();
