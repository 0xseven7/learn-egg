module.exports = config => async (ctx, next) => {
  console.log(config.format(ctx.url));
  next();
};
