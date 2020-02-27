const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 名字
  name: { type: String },
  // 头像
  avatar: { type: String },
  // 封面
  cover: { type: String },
  // 外号
  title: { type: String },
  // 分类
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  // 难度/技能/功击/生存，评分
  scores: {
    difficulty: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 技能
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
    delay: { type: String },
    cost: { type: String }
  }],
  // 顺风出装
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  // 逆风出装
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 最佳搭档
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: { type: String }
  }],
  // 被克制
  backs: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: { type: String }
  }],
  // 克制谁
  fronts: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)