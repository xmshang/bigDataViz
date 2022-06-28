/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
export const baseUrl = 'http://localhost:9998'
// 服务器地址
// export const projectBaseUrl = 'http://54.218.241.2:8080/'
export const projectBaseUrl = 'http://localhost:8888/'
export default {
    baseUrl,
    projectBaseUrl
}