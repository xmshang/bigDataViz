module.exports = {
  devServer: {
    proxy: { // 设置代理
      "/api": { // 将域名映射到"/api"
        target: "http://192.168.10.81:9998", // 目标服务器接口
        changeOrigin: true, // 设置是否允许跨域，默认false
        pathRewrite: {
          "^/api": "/" // 重写路径运行后代理至相应地址
        } 
      }
    }
  }
}