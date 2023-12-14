const fs = require("fs");

const momentServices = require("../services/moment.services");
const momentLabelServices = require("../services/momentLabel.services");
const pictureServices = require("../services/picture.services");
const { PICTURE_PATH } = require("../constants/path.constanst");

class MomentController {
  async create(ctx, next) {
    // 获取数据
    const userId = ctx.user.id;
    const { content } = ctx.request.body;
    // 添加数据
    const res = await momentServices.create(userId, content);
    ctx.body = res;
  }

  async getMoment(ctx, next) {
    // 获取momentId
    const { momentId } = ctx.request.params;
    // 根据Id查询moment
    const res = await momentServices.getMomentById(momentId);
    ctx.body = res;
  }

  async getMomentDetail(ctx, next) {
    // 获取momentId
    const { momentId } = ctx.request.params;
    // 根据Id查询moment
    const res = await momentServices.getMomentDetailById(momentId);
    ctx.body = res;
  }

  async getAllMoment(ctx, next) {
    // 获取数据
    const { offset, limit } = ctx.request.query;
    // 查询数据
    const res = await momentServices.getMoments(offset, limit);
    ctx.body = res;
  }

  async updateMoment(ctx, next) {
    const { momentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const res = await momentServices.updateMoment(momentId, content);
    const count = res.toString();
    if (count == 0) {
      ctx.body = { update: "Error" };
    } else {
      ctx.body = { update: "Success" };
    }
  }

  async deleteMoment(ctx, next) {
    const { momentId } = ctx.request.params;
    const res = await momentServices.deleteMoment(momentId);
    const count = res.toString();
    console.log(count);
    if (count == 0) {
      ctx.body = { delete: "Error" };
    } else {
      ctx.body = { delete: "Success" };
    }
  }

  /* 添加标签 */
  async addLabels(ctx, next) {
    const labels = ctx.labels;
    const { momentId } = ctx.request.params;
    const result = [];
    for (const label of labels) {
      const [res, created] = await momentLabelServices.findOrCreate(
        momentId,
        label.id
      );
      result.push(res.toJSON());
    }
    ctx.body = result;
  }

  // 查看图片
  async viewPicture(ctx, next) {
    let { filename } = ctx.request.params;
    const fileInfo = await pictureServices.getPicByName(filename);
    const { type } = ctx.request.query;
    const types = ["large", "middle", "small"];
    if (types.some((item) => item === type)) {
      filename = `${filename}-${type}`;
    }
    if (fileInfo) {
      ctx.response.set("content-type", fileInfo.mimetype);
      ctx.body = fs.readFileSync(`${PICTURE_PATH}/${filename}`);
    }
  }
}

module.exports = new MomentController();
