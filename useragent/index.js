const Koa = require("koa");
const app = new Koa();
const log = require("./middleWare/log");
const userAgent = require("koa-useragent");
app.use(userAgent);
app.use(async (ctx, next) => {
  console.log(require("util").inspect(ctx.userAgent));
  next();
});
const config = {
  format: text => `==========${text}++++++++`
};
app.use(log(config));

app.listen(3000, () => {
  console.log("listen at 3000");
});
