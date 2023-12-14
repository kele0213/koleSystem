const crypto = require("crypto");
const { PASSWORD_PUBLIC_KEY, PASSWORD_IV } = require("../app/config");
const bufferKey = Buffer.from(PASSWORD_PUBLIC_KEY);
const bufferIv = Buffer.from(PASSWORD_IV);

function encrypt(word) {
  // 创建加密对象，使用什么方式加密，这里使用AES的CBC加密
  const crt = crypto.createCipheriv("aes-128-cbc", bufferKey, bufferIv);
  // 传入输入文本，输入格式，输出格式
  let res = crt.update(word, "utf-8", "hex");
  //  最终结果使用什么编码输出
  res += crt.final("hex");
  return res;
}

function decrypt(word) {
  const dct = crypto.createDecipheriv("aes-128-cbc", bufferKey, bufferIv);
  let res = dct.update(word, "hex", "utf-8");
  res += dct.final("utf-8");
  return res;
}

module.exports = {
  encrypt,
  decrypt,
};
