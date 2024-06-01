module.exports = {
  devServer: {
    proxy: {
      '/116.30.22.114': {
        target: 'https://aip.baidubce.com',
        changeOrigin: true,
        pathRewrite: {
          '^/116.30.22.114': '' // 将 '/baiduApi' 前缀去掉
        }
      }
    }
  }
};
