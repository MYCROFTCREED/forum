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
        target: 'http://localhost:8080', // Your Java backend server address
        changeOrigin: true,
        pathRewrite: {
          '^/': '', // Remove the '/api' prefix when forwarding the request
        },
      },
    },
  },
};
