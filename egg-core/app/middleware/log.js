module.exports = config => async (ctx, next) => {
  console.log(config);
  // console.log(config.log.format(ctx.url));
  await next();
};
