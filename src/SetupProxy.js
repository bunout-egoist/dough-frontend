const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://api.bunout.info:8080",
      changeOrigin: true,
    })
  );
};