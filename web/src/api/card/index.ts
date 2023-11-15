export interface card {
  code: number,
}

export interface wallsData {
  id: number,
  type: number,
  message: string,
  name: string,
  userId: string,
  moment: string,
  label: number,
  color: string,
  imgurl: string
}

export interface wallsDataType extends card {
  data: wallsData
}

export interface findWallPage {
  type: number,
  page: number,
  userId: String,
  label: number
}