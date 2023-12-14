const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    // 获取数据
    const { id, username } = ctx.user;
    // 操作数据（添加token之类的）
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    // 返回数据
    ctx.body = {
      id,
      username,
      token,
    };
  }

  async success(ctx, next) {
    ctx.body = ctx.user;
  }
}

module.exports = new AuthController();
