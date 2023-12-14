const { sequelize, DataTypes, Model } = require("../../app/database");
const Moment = require("./moment.class");
const Label = require("./label.class");

class MomentAndLabel extends Model {}
MomentAndLabel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    labelId: {
      field: "label_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Label,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "moment_label",
  }
);

module.exports = MomentAndLabel;
