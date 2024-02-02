const { defineConfig } = require('@vue/cli-service')
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
})
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/': '',
        },
      },
    },
  },
};
