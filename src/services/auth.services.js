const { sequelize } = require("../app/database");

class AuthServices {
  //检查是否为作者本人
  async checkPermission(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id=? AND user_id=?`;
    const [res] = await sequelize.query(statement, {
      replacements: [id, userId],
    });
    if (res.length) return true;
    return false;
  }
}

module.exports = new AuthServices();
