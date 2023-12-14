const { Picture } = require("./classes");

class PictureServices {
  async created(filename, mimetype, size, userId, momentId) {
    const res = await Picture.create({
      filename,
      mimetype,
      size,
      userId,
      momentId,
    });
    return res.toJSON();
  }
  async getPicByName(filename) {
    const res = await Picture.findOne({
      where: {
        filename,
      },
    });
    return res?.toJSON();
  }
}

module.exports = new PictureServices();
