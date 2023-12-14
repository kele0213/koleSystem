const jwt = require("jsonwebtoken");

const errorType = require("../constants/error.constanst");
const userServices = require("../services/user.services");
const { encrypt } = require("../utils/crypt");
const { PUBLIC_KEY } = require("../app/config");
const { checkPermission } = require("../services/auth.services");

// 验证账号密码是否正确
async function checkLogin(ctx, next) {
  const { username, password } = ctx.request.body;
  // 账号或者密码是否为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(errorType.USER_NULL_ERROR), ctx);
  }
  // 用户是否存在
  const res = await userServices.findUserByName(username); // 空返回null
  if (!res) {
    return ctx.app.emit("error", new Error(errorType.USERNAME_NOT_EXITS), ctx);
  }
  //   console.log(res, "res");
  // 密码是否正确
  const encryptPassword = encrypt(password);
  if (encryptPassword !== res.dataValues.password) {
    return ctx.app.emit("error", new Error(errorType.PASSWORD_ERROR), ctx);
  }

  ctx.user = res.dataValues;

  await next();
}

// 检查token
async function checkAuth(ctx, next) {
  // 检查授权的中间件
  const authorization = ctx.headers.authorization;
  try {
    const token = authorization.replace("Bearer ", "");
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = res;
  } catch (error) {
    console.log(error);
    return ctx.app.emit("error", new Error(errorType.UNAUTHORIZATION), ctx);
  }
  await next();
}

/* 验证权限的中间件 */
async function checkAuthorPermission(ctx, next) {
  //   获取数据
  const userId = ctx.user.id;
  const [name] = Object.keys(ctx.request.params);
  const tableName = name.replace("Id", "s"); // momentId -> moments表
  const checkId = ctx.request.params[name];

  //   查询数据
  const res = await checkPermission(tableName, checkId, userId);
  if (!res) {
    return ctx.app.emit("error", new Error(errorType.NO_AUTH), ctx);
  }
  await next();
}

module.exports = {
  checkLogin,
  checkAuth,
  checkAuthorPermission,
};
