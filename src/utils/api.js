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

// 获取商品类型
export function fetchCateList(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}

// 删除商品
export function fetchGoodDel(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}

// 获取商品详情
export function fetchGoodDetail(params) {
  return axios({
    url: '/api/v1/good/detail',
    method: 'GET',
    params
  })
}

// 登入
export function fetchLogin(data) {
  return axios({
    url: '/api/v1/user/login',
    method: 'POST',
    data
  })
}

export default {
  fetchQqMusic,
  fetchAddorEdit,
  fetchGoodList,
  fetchCateList,
  fetchGoodDel,
  fetchGoodDetail,
  fetchLogin
}
