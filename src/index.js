const app = require("./app");
const { SERVER_PORT } = require("./app/config");

app.listen(SERVER_PORT, () => {
  console.log(`服务器开启成功,端口号${SERVER_PORT}`);
});
