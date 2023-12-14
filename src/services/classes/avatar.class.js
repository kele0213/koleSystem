const { sequelize, DataTypes, Model } = require("../../app/database");
const User = require("./user.class");

class Avatar extends Model {}

Avatar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    mimetype: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
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
    tableName: "avatar",
    sequelize,
  }
);

module.exports = Avatar;
