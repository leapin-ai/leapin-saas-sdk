const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://staging.app.leapin-ai.com',
      changeOrigin: true,
      onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
  app.use(
    '/rag-chatbot',
    createProxyMiddleware({
      target: 'https://rag-chatbot.leapin-ai.com',
      changeOrigin: true,
      pathRewrite: { '^/rag-chatbot': '' },
      onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
};
