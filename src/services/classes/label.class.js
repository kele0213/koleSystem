const { sequelize, DataTypes, Model } = require("../../app/database");

class Label extends Model {}
Label.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "labels",
  }
);

module.exports = Label;
