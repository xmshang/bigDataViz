import request from '@/utils/request'
/**
 * 地震主页数据
 * @param {} data 
 */

// 全国页面整体数据
export function getHomeData (params) {
  return request({
    url: '/earthquakeInfo/getEQData',
    method: 'get',
    params
  })
}
// 某省页面整体数据
export function getProvinceData (params) {
  return request({
    url: '/earthquakeInfo/getProvinceEQData',
    method: 'get',
    params
  })
}
// 某一震区页面整体数据
export function getOneEarthquakeData (params) {
  return request({
    url: '/earthquakeInfo/getRegionEQData',
    method: 'get',
    params
  })
}
