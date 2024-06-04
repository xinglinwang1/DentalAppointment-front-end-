module.exports = {
  devServer: {
    proxy: {
      '/10.61.152.144/v1': {
        target: 'https://api.moonshot.cn/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/10.61.152.144/v1': ''
        }
      }
    }
  }
};
