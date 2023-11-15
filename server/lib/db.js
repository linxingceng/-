const mysql = require('mysql');
const config = require('../config/default');

// 第一次连接数据库
const db = mysql.createConnection({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
})

// 连接指定数据库
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.WALL,
})

// 直接使用db.query
let bdbs = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// 通过pool.getConnection 获取连接
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release(); // 释放该链接，把该链接放回池里供其他人使用
        }
        )
      }
    })
  })
}

// 创建数据库
let WALL = 'create database if not exists wall default charset utf8 collate utf8_general_ci'

let createDatabese = (db) => {
  return bdbs(db, [])
}

// 创建数据表
// 留言/照片
let walls = `create table if not exists walls(
  id INT NOT NULL AUTO_INCREMENT,
  type INT NOT NULL COMMENT '类型 0信息1图片',
  message VARCHAR(1000) COMMENT '留言',
  name VARCHAR(100) NOT NULL COMMENT '用户名',
  userId VARCHAR(100) NOT NULL COMMENT '创建者ID',
  moment VARCHAR(100) NOT NULL COMMENT '创建时间',
  label INT NOT NULL COMMENT '标签',
  color INT COMMENT '颜色',
  imgurl VARCHAR(100) COMMENT '图片路径',
  PRIMARY KEY (id)
)`

// 留言反馈
let feedbacks = `create table if not exists feedbacks(
  id INT NOT NULL AUTO_INCREMENT,
  wallId INT NOT NULL COMMENT '留言ID',
  userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',
  type INT NOT NULL COMMENT '反馈类型 0喜欢1举报2撤销',
  moment VARCHAR(100) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
)`

// 留言评论
let comments = `create table if not exists comments(
  id INT NOT NULL AUTO_INCREMENT,
  wallId INT NOT NULL COMMENT '留言ID',
  userId VARCHAR(100) NOT NULL COMMENT '评论者ID',
  imgurl VARCHAR(100) COMMENT '头像路径',
  comment VARCHAR(1000) COMMENT '评论内容',
  name VARCHAR(100) NOT NULL COMMENT '用户名',
  moment VARCHAR(100) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
)`

let createTabel = (sql) => {
  return query(sql, [])
}

// 先创建数据库再创建表
async function create() {
  await createDatabese(WALL);
  createTabel(walls);
  createTabel(feedbacks);
  createTabel(comments);
}

create();

// 新建walls
exports.insertWall = (value) => {
  let _sql = "insert into walls set type=?, message=?,name=?,userId=?, moment=?, label=?, color=?,imgurl=?";
  return query(_sql, value);
}

// 新建反馈
exports.insertFeedback = (value) => {
  let _sql = "insert into feedbacks set wallId=?, userId=?, type=?, moment=?";
  return query(_sql, value);
}

// 新建评论
exports.insertComment = (value) => {
  let _sql = "insert into comments set wallId=?, userId=?, imgurl=?, moment=?, comment=?,name=?";
  return query(_sql, value);
}

// 删除墙，主表对应多条子表一起删除
exports.deleteWall = (id) => {
  let _sql = `delete a,b,c from walls a left join feedbacks b on a.id=b.wallId left join comments c on a.id=c.wallId where a.id="${id}";`
  return query(_sql);
}

// 删除反馈
exports.deleteFeedback = (id) => {
  let _sql = `delete from feedbacks where id="${id}";`
  return query(_sql);
}

// 删除评论
exports.deleteComment = (id) => {
  let _sql = `delete from comments where id="${id}";`
  return query(_sql);
}

// 分页查询墙
exports.findWallPage = (page, pagesize, type, label) => {
  let _sql;
  if (label == -1) {
    _sql = `select * from walls where type="${type}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
  } else {
    // 当有标签时查阅标签
    _sql = `select * from walls where type="${type}" and label="${label}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
  }
  return query(_sql);
}

// 倒叙分页查询墙的评论
exports.findCommentPage = (page, pagesize, id) => {
  let _sql = `select * from comments where wallId="${id}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
  return query(_sql);
}

// 查询各反馈总数据
exports.findbackCount = (wid, type) => {
  let _sql = `select count(*) as count from feedbacks where wallId="${wid}" and type="${type}";`
  return query(_sql);
}

// 查询评论总数
exports.commentCount = (wid) => {
  let _sql = `select count(*) as count from comments where wallId="${wid}";`
  return query(_sql);
}

// 是否点赞查询
exports.likeCount = (wid, uid) => {
  let _sql = `select count(*) as count from feedbacks where wallId="${wid}" and userId="${uid}" and type=0;`
  return query(_sql);
}