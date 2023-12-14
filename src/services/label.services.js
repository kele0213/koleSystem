const { Label, MomentAndLabel } = require("./classes");
const { sequelize } = require("../app/database");

class LabelServices {
  async create(name) {
    const res = await Label.create({
      name,
    });
    return res.toJSON();
  }

  async findOrCreate(name) {
    const res = await Label.findOrCreate({
      where: {
        name,
      },
    });
    return res;
  }

  async getAllLabels(limit, offset) {
    const res = await Label.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return res;
  }

  async getLabelByMomentId(momentId) {
    const statement = `SELECT DISTINCT l.name FROM moment_label ml
    LEFT JOIN labels l ON l.id = ml.label_id
    WHERE ml.moment_id = ?`;
    const [res] = await sequelize.query(statement, {
      replacements: [momentId],
    });
    console.log(res);
    return res;
  }
}

module.exports = new LabelServices();
