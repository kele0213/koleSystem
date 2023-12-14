const avatarServices = require("../services/avatar.services");
const userServices = require("../services/user.services");
const pictureServices = require("../services/picture.services");
const { APP_HOST, SERVER_PORT } = require("../app/config");

class FileController {
  async saveAvatar(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const userId = ctx.user.id;
    // 上传图片数据库
    const res = await avatarServices.create(filename, mimetype, size, userId);
    // 上传用户数据库
    const avatarURL = `${APP_HOST}:${SERVER_PORT}/user/${userId}/avatar`;
    await userServices.updateAvatar(avatarURL, userId);
    ctx.body = res;
  }

  async savePicture(ctx, next) {
    const files = ctx.req.files;
    const userId = ctx.user.id;
    const { momentId } = ctx.request.params;
    for (let file of files) {
      const { filename, mimetype, size } = file;
      const res = await pictureServices.created(
        filename,
        mimetype,
        size,
        userId,
        momentId
      );
    }
    ctx.body = {
      success: true,
    };
  }
}

module.exports = new FileController();
