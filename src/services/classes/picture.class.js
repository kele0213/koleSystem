const { sequelize, DataTypes, Model } = require("../../app/database");
const User = require("./user.class");
const Moment = require("./moment.class");

class Picture extends Model {}
Picture.init(
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
    momentId: {
      field: "moment_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Moment,
        key: "id",
      },
    },
  },
  {
    tableName: "pictures",
    sequelize,
  }
);
module.exports = Picture;
