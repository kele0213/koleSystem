const User = require("./user.class.js");
const Moment = require("./moment.class.js");
const Comment = require("./comment.class.js");
const Label = require("./label.class.js");
const MomentAndLabel = require("./moment_label.js");
const Avatar = require("./avatar.class.js");
const Picture = require("./picture.class.js");
// USER-MOMENT 一对多
User.hasMany(Moment, {
  foreignKey: "userId",
});
Moment.belongsTo(User, {
  foreignKey: "userId",
});

// 动态-评论 一对多
Moment.hasMany(Comment, {
  foreignKey: "momentId",
});
Comment.belongsTo(Moment, {
  foreignKey: "momentId",
});
// 用户-评论 一对多
User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User, {
  foreignKey: "userId",
});

// 动态——标签 多对多
Moment.belongsToMany(Label, {
  through: MomentAndLabel,
  foreignKey: "momentId",
});
Label.belongsToMany(Moment, {
  through: MomentAndLabel,
  foreignKey: "labelId",
});

// 动态——图片 一对多
Moment.hasMany(Picture, {
  foreignKey: "momentId",
});
Picture.belongsTo(Moment, {
  foreignKey: "momentId",
});

module.exports = {
  User,
  Moment,
  Comment,
  Label,
  MomentAndLabel,
  Avatar,
  Picture,
};
