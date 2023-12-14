const { sequelize, DataTypes, Model } = require("../../app/database");
const User = require("./user.class");

class Moment extends Model {}
Moment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "moments",
    sequelize,
  }
);

module.exports = Moment;
