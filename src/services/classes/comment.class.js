const { sequelize, Model, DataTypes } = require("../../app/database");
const Moment = require("./moment.class");
const User = require("./user.class");

class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(1024),
      allowNull: false,
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
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      field: "comment_id",
      allowNull: true,
      references: {
        model: Comment,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);

module.exports = Comment;
