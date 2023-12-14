const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { errorHandle, catchError } = require("./errorHandle");
// 路由加载
const useRoutes = require("../routers");

const app = new Koa();
// 全局捕获错误
app.use(catchError);
// 解析body数据
app.use(bodyParser());
// 路由信息
useRoutes(app);

// 处理错误信息
app.on("error", errorHandle);

module.exports = app;
