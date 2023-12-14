const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.configDotenv();
// TOKEN对称加密公钥和私钥
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key")
);

module.exports = {
  APP_HOST,
  SERVER_PORT,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_ROOT,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  PASSWORD_PUBLIC_KEY,
  PASSWORD_IV,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
