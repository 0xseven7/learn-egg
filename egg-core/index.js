const Koa = require("koa");
const init = require("./egg");
const log = require("./app/middleware/log.js");
const app = new Koa();
init(app);

app.use(async (ctx, next) => {
  ctx.service.log();
  console.log(ctx.service);
  console.log(ctx.config);
  ctx.type = "application/json";
  // ctx.service.log();
  ctx.body = ctx.service.user.getUser();
});
app.listen(3000, () => {
  console.log("3000");
});
