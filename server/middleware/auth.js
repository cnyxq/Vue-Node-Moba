module.exports = () => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/adminUser')
  return async (req, res, next) => {
    // 加密密钥
    const Key = 'yan'
    // 取出token
    const token = String(req.headers.authorization || '').split(' ').pop()
    if (!token) {
      return res.status(401).send({
        message: '请先登录！'
      })
    }
    // 验证token是否过期
    jwt.verify(token, Key, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: '登录失效，请重新登录！'
        })
      }
    })
    // 解析token
    const {id} = jwt.verify(token, Key)
    if (!id) {
      return res.status(401).send({
        message: '请先登录！'
      })
    }
    // 是否在库中
    req.user = await AdminUser.findById(id)
    if (!req.user) {
      return res.status(401).send({
        message: '请先登录！'
      })
    }
    await next()
  }
}