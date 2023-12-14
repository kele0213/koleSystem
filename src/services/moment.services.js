const { Moment, User, Comment, Label, Picture } = require("./classes");
const { sequelize } = require("../app/database");
const { APP_HOST, SERVER_PORT } = require("../app/config");

class MomentServices {
  async create(userId, content) {
    const res = await Moment.create({
      userId,
      content,
    });
    return res;
  }
  async getMomentDetailById(momentId) {
    const res = await Moment.findOne({
      where: {
        id: momentId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatarURL"],
        },
        {
          model: Label,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
        },
        {
          model: Picture,
          attributes: [
            [
              sequelize.fn(
                "CONCAT",
                `${APP_HOST}:${SERVER_PORT}/moments/pics/`,
                sequelize.col("filename")
              ),
              "pics",
            ],
            "mimetype",
          ],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
            SELECT COUNT(*) FROM comments
            WHERE moment_id = Moment.id
          )`),
            "commentsCount",
          ],
          [
            sequelize.literal(`(
            SELECT COUNT(*) FROM moment_label
            WHERE moment_id = Moment.id
          )`),
            "labelsCount",
          ],
        ],
      },
    });

    return res;
  }
  async getMomentById(momentId) {
    const res = await Moment.findOne({
      where: {
        id: momentId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatarURL"],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
            SELECT COUNT(*) FROM comments
            WHERE moment_id = Moment.id
          )`),
            "commentsCount",
          ],
          [
            sequelize.literal(`(
            SELECT COUNT(*) FROM moment_label
            WHERE moment_id = Moment.id
          )`),
            "labelsCount",
          ],
        ],
      },
    });

    return res;
  }

  async getMoments(offset, limit) {
    const res = await Moment.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      include: {
        model: User,
        attributes: ["id", "username", "avatarURL"],
      },
      attributes: {
        include: [
          [
            sequelize.literal(`(
            SELECT COUNT(*) FROM comments
            WHERE moment_id = Moment.id
          )`),
            "commentsCount",
          ],
          [
            sequelize.literal(`(
            SELECT COUNT(*) FROM moment_label
            WHERE moment_id = Moment.id
          )`),
            "labelsCount",
          ],
        ],
      },
    });
    return res;
  }

  async updateMoment(id, newValue) {
    const res = await Moment.update(
      {
        content: newValue,
      },
      {
        where: {
          id,
        },
      }
    );
    return res;
  }

  async deleteMoment(id) {
    const res = await Moment.destroy({
      where: {
        id,
      },
    });
    return res;
  }
}

module.exports = new MomentServices();
