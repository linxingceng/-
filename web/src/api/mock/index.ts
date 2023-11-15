export interface MockType {
  // 创建时间
  "moment": Date,
  // id
  "id"?: number,
  // userid
  "userid": string,
  // 内容
  "message": string,
  // label标签
  "label": number,
  // name
  "name": string,
  // like
  "like": number,
  // 评论
  "comment": number,
  // 背景色
  "imgurl": number,
  // 是否撤销
  "revoke": number,
  // 是否举报
  "report": number,
  // 类型
  "type": number
}

export type MockTypeList = MockType[];

export type MockTypeMap = {
  "data": MockType[];
}

