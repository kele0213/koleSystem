const { Avatar } = require("./classes");

class AvatarServices {
  async create(filename, mimetype, size, userId) {
    const res = await Avatar.create({
      filename,
      mimetype,
      size,
      userId,
    });
    return res.toJSON();
  }

  async getAvatarById(userId) {
    const res = await Avatar.findOne({
      where: {
        userId,
      },
      order: [["id", "DESC"]],
    });
    return res ? res.toJSON() : null;
  }
}

module.exports = new AvatarServices();
