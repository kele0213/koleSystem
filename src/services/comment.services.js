const { Comment, User } = require("./classes");

class commentServices {
  // 创建评论
  async create(momentId, content, userId) {
    const res = await Comment.create({
      momentId,
      content,
      userId,
    });
    return res.toJSON();
  }
  //   回复评论
  async reply(momentId, content, userId, commentId) {
    const res = await Comment.create({
      momentId,
      content,
      userId,
      commentId,
    });
    return res.toJSON();
  }
  //   修改评论
  async update(commentId, newValue) {
    const res = await Comment.update(
      {
        content: newValue,
      },
      {
        where: {
          id: commentId,
        },
      }
    );
    return res;
  }
  //   删除评论
  async delete(commentId) {
    const res = await Comment.destroy({
      where: {
        id: commentId,
      },
    });
    return res;
  }
  // 获取评论
  async getCommentByMomentId(momentId) {
    const res = await Comment.findAll({
      where: {
        momentId,
      },
      include: {
        model: User,
        attributes: ["id", "username", "avatarURL"],
      },
    });
    return res;
  }
  // 根据ID获取评论
  async getCommentById(commentId) {
    const res = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    return res.toJSON();
  }
}

module.exports = new commentServices();
