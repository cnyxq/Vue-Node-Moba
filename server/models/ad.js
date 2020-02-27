const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  items: [{
    icon: String,
    url: String
  }]
})

module.exports = mongoose.model('Ad', schema) // “集合名称” 这里第三个参数给省略了，默认为模型名的小写负数形式

