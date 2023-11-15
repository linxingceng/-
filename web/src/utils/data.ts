// 墙的性质
export const wallType = [
  {
    name: '留言墙',
    slogan: '很多事情值得记录，当然也值得回味'
  },
  {
    name: '照片墙',
    slogan: '很多事情值得记录，当然也值得回味'
  }
];

// 分类标签
export const label = [
  ['留言', '目标', '理想', '过去', '将来', '爱情', '亲情', '友情', '秘密', '信条', '无题'],
  ['我', 'ta', '喜欢的', '有意义的', '值得纪念的', '母校', '生活', '天空', '我在的城市', '大海', '无题']
]

// 卡片背景颜色
export const cardBgColor = [
  'rgba(252,175,162,0.30)',
  'rgba(255,227,148,0.30)',
  'rgba(146,230,245,0.30)',
  'rgba(168,237,138,0.30)',
  'rgba(202,167,247,0.30)',
  'rgba(212,212,212,0.30)',
]

// 新建卡片的背景颜色
export const cardBgColor1 = [
  'rgba(252,175,162,1)',
  'rgba(255,227,148,1)',
  'rgba(146,230,245,1)',
  'rgba(168,237,138,1)',
  'rgba(202,167,247,1)',
]

// 头像北极
export const portrait = [
  'linear-gradient(180deg, #FFA9D9 0%, #EB3D3D 100%)',
  'linear-gradient(180deg, #FFA7EB 0%, #F026AB 100%)',
  'linear-gradient(180deg, #F5ABFF 0%, #BF23E5 100%)',
  'linear-gradient(180deg, #DFA1FF 0%, #9A36F0 100%)',
  'linear-gradient(180deg, #C9AAFF 0%, #6D3CF5 100%)',
  'linear-gradient(180deg, #9EAAFF 0%, #3846F4 100%)',
  'linear-gradient(180deg, #8CD8FF 0%, #2A6AF0 100%)',
  'linear-gradient(180deg, #7BE7FF 0%, #1E85E2 100%)',
  'linear-gradient(180deg, #92FDFF 0%, #14B2DD 100%)',
  'linear-gradient(180deg, #89FEDB 0%, #18C997 100%)',
  'linear-gradient(180deg, #D7FFA7 0%, #5ED52A 100%)',
  'linear-gradient(180deg, #FFED48 0%, #FD9E16 100%)',
  'linear-gradient(180deg, #FFDC83 0%, #F88816 100%)',
  'linear-gradient(180deg, #FFBABD 0%, #EB6423 100%)',
]


// 墙数据接口
export interface WallType1 {
  name: string,
  slogan: string
}

// 墙的数据类型
export type WallTypeType = WallType1[]


// 分类标签的类型
export type LabelType = string[][];

// 卡片颜色类型
export type CardBgColorType = string[];


import cardImage from '../assets/images/card.svg';
import photoImage from '../assets/images/photo.svg';


// 为空时显示
export const none = [
  {
    url: cardImage,
    msg: '还没有留言，快贴上第一张吧',
  },
  {
    url: photoImage,
    msg: '还没有图片，快贴上第一张吧'
  }
]