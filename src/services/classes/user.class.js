const { sequelize, DataTypes, Model } = require("../../app/database");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    avatarURL: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

module.exports = User;
