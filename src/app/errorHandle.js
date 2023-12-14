const errorType = require("../constants/error.constanst");

async function catchError(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error.message,
    };
  }
}

function errorHandle(error, ctx) {
  let status = 400,
    message;
  switch (error.message) {
    case errorType.USER_NULL_ERROR:
      message = "账号或密码不能为空";
      break;
    case errorType.USERNAME_EXITS:
      message = "用户名已经存在";
      break;
    case errorType.USERNAME_NOT_EXITS:
      message = "用户不存在";
      break;
    case errorType.PASSWORD_ERROR:
      status = 400;
      message = "用户密码错误";
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = "token无效";
      break;
    case errorType.NO_AUTH:
      status = 400;
      message = "您没有修改权限！";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
      break;
  }
  ctx.status = status;
  ctx.body = {
    code: status,
    message,
  };
}

module.exports = { errorHandle, catchError };
