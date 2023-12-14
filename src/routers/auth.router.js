const Router = require("koa-router");
const authController = require("../controllers/auth.controller");
const { checkLogin, checkAuth } = require("../middlewares/auth.middleware");

const authRouter = new Router();

authRouter.post("/login", checkLogin, authController.login);

authRouter.get("/test", checkAuth, authController.success);

module.exports = authRouter;
