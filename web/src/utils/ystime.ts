// 时间方法
export const dataOne = (e: Date) => {
  let time = new Date(e);
  let Y = time.getFullYear();
  let M = time.getMonth() + 1;
  let D = time.getDate();
  let DD = D < 10 ? '0' + D : D;
  let MM = M < 10 ? '0' + M : M;
  let dates = Y + '-' + MM + '-' + DD;
  return dates;
}

// 获取图片URL
export const getObjectURL = (file: File) => {
  let url = null;

  if (URL && URL.createObjectURL) {
    url = URL.createObjectURL(file);
  }

  return url;
};




