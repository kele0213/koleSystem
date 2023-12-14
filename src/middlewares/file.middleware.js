const Multer = require("koa-multer");
const Jimp = require("jimp");
const path = require("path");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/path.constanst");

const avatarMulter = Multer({
  dest: AVATAR_PATH,
});

const uploadAvatar = avatarMulter.single("avatar");

const picMulter = Multer({
  dest: PICTURE_PATH,
});
const uploadPicture = picMulter.array("pics", 9);

async function picResize(ctx, next) {
  const files = ctx.req.files;
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    Jimp.read(file.path).then((image) => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
    });
  }
  await next();
}

module.exports = {
  uploadAvatar,
  uploadPicture,
  picResize,
};
