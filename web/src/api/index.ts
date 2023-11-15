import fetch from '@/utils/axios'
// import type { wallsData, wallsDataType, findWallPage } from './card/index'

// 获取访问者ip
export const signIpApi = async () => await fetch.post('/signip');

// 新建wall
export const insertWallApi = (data: any) => fetch.post('./insertwall', data);

// 查询墙
export const findWallPageApi = (data: any) => fetch.post('./findwallpage', data);

// 反馈
export const insertfeedbackApi = (data: any) => fetch.post('./insertfeedback', data);

// 评论
export const insertcommentApi = (data: any) => fetch.post('./insertcomment', data);

// 获取评论
export const findCommentPageApi = (data: any) => fetch.post('./findwallcommentpage', data);

// 上传图片
export const profileApi = (data: any) => fetch.post('./profile', data);