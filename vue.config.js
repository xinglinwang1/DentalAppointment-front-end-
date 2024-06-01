module.exports = {
  devServer: {
    proxy: {
      '/baiduApi': {
        target: 'https://aip.baidubce.com',
        changeOrigin: true,
        pathRewrite: {
          '^/baiduApi': '' // 将 '/baiduApi' 前缀去掉
        }
      }
    }
  }
};
