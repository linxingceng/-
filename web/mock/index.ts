// 引入mock
import Mock from 'mockjs';
import type { MockTypeMap } from '@/api/mock/index.ts'

// 留言note
export const note = Mock.mock<MockTypeMap>({
  "data|19": [{
    // 创建时间
    "moment": new Date(),
    // id
    "id|+1": 1,
    // userid
    "userid|+1": 10,
    // 内容
    "message|24-84": "@cword",
    // label标签
    "label|0-10": 0,
    // name
    "name": "@cname",
    // like
    "like|0-120": 0,
    // 评论
    "comment|0-120": 0,
    // 背景色
    "imgurl|0-4": 0,
    // 是否撤销
    "revoke|0-20": 0,
    // 是否举报
    "report|0-20": 0,
    // 类型
    "type": 0
  }]
})


// 评论
export const commont = Mock.mock({
  "data|19": [{
    // 创建时间
    "moment": new Date(),
    // id
    "id|+1": 1,
    // userid
    "userid|+1": 10,
    // 内容
    "message|24-96": "@cword",
    // name
    "name": "@cname",
    // 背景色
    "imgurl|0-13": 0,
  }]
})


// 照片photo
// 留言note
export const photo = Mock.mock<MockTypeMap>({
  "data|19": [{
    // 创建时间
    "moment": new Date(),
    // id
    "id|+1": 1,
    // userid
    "userid|+1": 10,
    // 内容
    "message|24-84": "@cword",
    // label标签
    "label|0-10": 0,
    // name
    "name": "@cname",
    // like
    "like|0-120": 0,
    // 评论
    "comment|0-120": 0,
    // 背景色
    "imgurl|0-5": 0,
    // 是否撤销
    "revoke|0-20": 0,
    // 是否举报
    "report|0-20": 0,
    // 类型
    "type": 1
  }]
})