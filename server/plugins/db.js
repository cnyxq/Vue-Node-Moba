module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/vue-node-moba', {
    useNewUrlParser: true
  }).then(res => {
    console.log('连接数据库成功！')
  })

  // 避免出错，一开始就加载一遍
  require('require-all')(__dirname + '/../models')
}