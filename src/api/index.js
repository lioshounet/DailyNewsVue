import request from './request.js'
// {date:20210719}
export function getDailyListByDate(data) {
  return request({
    url: '/daily/listbydate',
    method: 'post',
    data
  })
}

export function getDailyListByUid(data) {
  return request({
    url: '/daily/listbyuid',
    method: 'post',
    data
  })
}

export function getDailyList(data) {
  return request({
    url: '/daily/list',
    method: 'post',
    data
  })
}

export function createDaily(data) {
  return request({
    url: '/daily/create',
    method: 'post',
    data
  })
}

export function getDaily(data) {
  return request({
    url: '/daily/detailbyid',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfoByUid(data) {
  return request({
    url: '/user/getuserinfobyuid',
    method: 'post',
    data
  })
}

export function editUserByUid(data) {
  return request({
    url: '/user/edituserbyuid',
    method: 'post',
    data
  })
}

export function editContentById(data) {
  return request({
    url: '/daily/updatecontentbyid',
    method: 'post',
    data
  })
}

export function getUserDateCnt(data) {
  return request({
    url: '/daily/userdatelist',
    method: 'post',
    data
  })
}

// 日报用户授权
export function authuDaily(data) {
  return request({
    url: '/auth/dailybyusername',
    method: 'post',
    data
  })
}

// 创建书签
export function createBoolmarks(data) {
  return request({
    url: '/bookmarks/create',
    method: 'post',
    data
  })
}

// 获取全部书签
export function getAllBookmarks(data) {
  return request({
    url: "/bookmarks/getlistbyuid",
    method: "post",
    data
  })
}

// 根据id审核书签
export function auditBookmarksById(data) {
  return request({
    url: "/bookmarks/auditbyid",
    method: "post",
    data
  })
}

export default {
  getDailyListByUid,
  getDailyList,
  createDaily,
  getDaily,
  login,
  getUserInfoByUid,
  editUserByUid,
  editContentById,
  getUserDateCnt,
  getDailyListByDate,
  authuDaily,
  createBoolmarks,
  getAllBookmarks,
  auditBookmarksById
}