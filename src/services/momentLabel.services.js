const { MomentAndLabel } = require("./classes");
class momentLabelServices {
  async findOrCreate(momentId, labelId) {
    try {
      const res = await MomentAndLabel.findOrCreate({
        where: {
          momentId,
          labelId,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new momentLabelServices();
