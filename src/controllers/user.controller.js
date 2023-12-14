const fs = require("fs");
const userServices = require("../services/user.services");
const { AVATAR_PATH } = require("../constants/path.constanst");

class UserController {
  async register(ctx, next) {
    // 获取数据
    const user = ctx.request.body;
    // console.log(user);
    // 创建用户
    const res = await userServices.createUser(user);
    // console.log(res.dataValues);
    // 返回数据
    ctx.response.body = res.dataValues;
  }

  async viewAvatar(ctx, next) {
    const avatar = ctx.avatar;
    if (avatar) {
      ctx.response.set("content-type", avatar.mimetype);
      ctx.body = fs.readFileSync(`${AVATAR_PATH}/${avatar.filename}`);
    }
  }
}

module.exports = new UserController();
