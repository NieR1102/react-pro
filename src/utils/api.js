import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

// 添加商品
export function fetchAddorEdit(data) {
  return axios({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}

// 获取商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}

// 获取商品列表
export function fetchCateList(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}

export default {
  fetchQqMusic,
  fetchAddorEdit,
  fetchGoodList,
  fetchCateList
}
