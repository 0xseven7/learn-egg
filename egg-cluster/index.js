const Koa = require("koa");
const init = require("./egg");
const app = new Koa();

app.listen(3000, () => {
  console.log("listen at 3000");
});
init(app);
app.use(async (ctx, next) => {
  console.log(ctx.service);
  console.log(ctx.config);
  console.log(ctx);
  ctx.type = "application/json";
  ctx.body = ctx.service.user.getUsers();
});
