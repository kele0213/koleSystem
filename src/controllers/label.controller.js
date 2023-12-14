const LabelServices = require("../services/label.services");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const res = await LabelServices.create(name);
    ctx.body = res;
  }

  async getAllLabels(ctx, next) {
    const { limit, offset } = ctx.request.query;
    const res = await LabelServices.getAllLabels(limit, offset);
    ctx.body = res;
  }

  async getLabelByMomentId(ctx, next) {
    const { momentId } = ctx.request.params;
    const res = await LabelServices.getLabelByMomentId(momentId);
    ctx.body = res;
  }
}

module.exports = new LabelController();
