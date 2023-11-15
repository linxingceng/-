const dbModel = require('../lib/db');

// 新建walls
exports.insertWall = async (req, res) => {
  let data = req.body;
  console.log(data);
  await dbModel.insertWall([data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl]).then(result => {
    res.send({
      code: 200,
      message: result
    })
    console.log(result);
  })
}

// 新建反馈 
exports.insertFeedback = async (req, res) => {
  let data = req.body;
  await dbModel.insertFeedback([data.wallId, data.userId, data.type, data.moment]).then(result => {
    res.send({
      code: 200,
      message: result
    })
  })
}

// 新建评论
exports.insertComment = async (req, res) => {
  let data = req.body;
  await dbModel.insertComment([data.wallId, data.userId, data.imgurl, data.moment, data.comment, data.name]).then(result => {
    res.send({
      code: 200,
      message: result
    })
  })
}

// 删除墙，主表对应多条子表一起删除
exports.deleteWall = async (req, res) => {
  let data = req.body;
  // if (data.imgurl) {
  //   // 如果地址存在，删除对应图片
  //   Mkdir.delFiles('data/' + data.imgurl)
  // }
  await dbModel.deleteWall(data.id).then(result => {
    res.send({
      code: 200,
      message: result
    })
  })
}

// 删除反馈
exports.deleteFeedback = async (req, res) => {
  let data = req.body;
  await dbModel.deleteFeedback(data.id).then(result => {
    res.send({
      code: 200,
      message: result
    })
  })
}

// 删除评论
exports.deleteComment = async (req, res) => {
  let data = req.body;
  await dbModel.deleteComment(data.id).then(result => {
    res.send({
      code: 200,
      message: result
    })
  })
}

// 分页查询wall并获取点赞、举报、撤销数据
exports.findWallPage = async (req, res) => {
  let data = req.body;
  await dbModel.findWallPage(data.page, data.pagesize, data.type, data.label).then(async result => {
    for (let i = 0; i < result.length; i++) {
      // 查询对应wall的点赞、举报、撤销数据
      // 喜欢
      result[i].like = await dbModel.findbackCount(result[i].id, 0);
      // 举报
      result[i].report = await dbModel.findbackCount(result[i].id, 1);
      // 要求撤销
      result[i].revoke = await dbModel.findbackCount(result[i].id, 2);
      // 是否点赞
      result[i].islike = await dbModel.likeCount(result[i].id, data.userid);
      // 评论数
      result[i].comcount = await dbModel.commentCount(result[i].id);
    }
    res.send({
      code: 200,
      message: result
    })
  })
}

// 倒叙分页查墙的评论
exports.findCommentPage = async (req, res) => {
  let data = req.body;
  await dbModel.findCommentPage(data.page, data.pagesize, data.id).then(result => {
    res.send({
      code: 200,
      message: result
    })
  })
}