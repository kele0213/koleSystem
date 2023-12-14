const errorType = require("../constants/error.constanst");
const userServices = require("../services/user.services");
const avatarServices = require("../services/avatar.services");
const { encrypt } = require("../utils/crypt");

async function checkUser(ctx, next) {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    // 账号或者密码为空
    return ctx.app.emit("error", new Error(errorType.USER_NULL_ERROR), ctx);
  } else {
    // 检查用户是否存在
    const res = await userServices.findUserByName(username);
    if (res !== null) {
      return ctx.app.emit("error", new Error(errorType.USERNAME_EXITS), ctx);
    }
  }
  await next();
}
// 密码加密
async function passwordEncrypt(ctx, next) {
  const { password } = ctx.request.body;
  ctx.request.body.password = encrypt(password);
  await next();
}

async function getAvatar(ctx, next) {
  const { userId } = ctx.request.params;
  const avatar = await avatarServices.getAvatarById(userId);
  ctx.avatar = avatar;
  await next();
}

module.exports = {
  checkUser,
  passwordEncrypt,
  getAvatar,
};
