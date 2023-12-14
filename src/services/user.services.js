const { User } = require("./classes");

class UserServices {
  async createUser(user) {
    const res = await User.create(user);
    return res;
  }
  async findUserByName(name) {
    const res = await User.findOne({
      where: {
        username: name,
      },
    });
    return res;
  }
  async updateAvatar(avatarURL, userId) {
    const res = await User.update(
      {
        avatarURL,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return res;
  }
}

module.exports = new UserServices();
