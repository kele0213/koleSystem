const LabelServices = require("../services/label.services");

async function createLabels(ctx, next) {
  const { labels } = ctx.request.body;
  const labelArray = [];
  for (const name of labels) {
    const [label, created] = await LabelServices.findOrCreate(name);
    labelArray.push(label.toJSON());
  }
  ctx.labels = labelArray;
  await next();
}
module.exports = {
  createLabels,
};
