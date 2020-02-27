module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const multer = require('multer')
  const jwt = require('jsonwebtoken')

  // 数据模型
  const Category = require('../../models/category')
  const Item = require('../../models/item')
  const Hero = require('../../models/hero')
  const Article = require('../../models/article')
  const Ad = require('../../models/ad')
  const AdminUser = require('../../models/adminUser')

  // 登录效验中间件
  const auth = require('../../middleware/auth')

  /*分类区*/
  // 新建分类
  router.post('/categories', auth(), async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  // 查询分类列表
  router.get('/categories', auth(), async (req, res) => {
    const model = await Category.find().populate('parent').limit(100) // 限制返回数量为10
    res.send(model)
  })

  // 根据id查询分类
  router.get('/categories/:id', auth(), async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  // 更新指定id分类数据
  router.put('/categories/:id', auth(), async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 根据id删除数据
  router.delete('/categories/:id', auth(), async (req, res) => {
    const model = await Category.findByIdAndRemove(req.params.id)
    res.send(model)
  })

  /**物品区 */
  // 新建物品
  router.post('/items', auth(), async (req, res) => {
    const model = await Item.create(req.body)
    res.send(model)
  })

  // 查询物品列表
  router.get('/items', auth(), async (req, res) => {
    const model = await Item.find().limit(100) // 限制返回数量为10
    res.send(model)
  })

  // 根据id查询物品
  router.get('/items/:id', auth(), async (req, res) => {
    const model = await Item.findById(req.params.id)
    res.send(model)
  })

  // 更新指定id物品数据
  router.put('/items/:id', auth(), async (req, res) => {
    const model = await Item.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 根据id删除物品数据
  router.delete('/items/:id', auth(), async (req, res) => {
    const model = await Item.findByIdAndRemove(req.params.id)
    res.send(model)
  })

  /**英雄区 */
  // 新建英雄
  router.post('/heroes', auth(), async (req, res) => {
    const model = await Hero.create(req.body)
    res.send(model)
  })

  // 查询英雄列表
  router.get('/heroes', auth(), async (req, res) => {
    const model = await Hero.find().limit(150)
    res.send(model)
  })

  // 根据id查询英雄
  router.get('/heroes/:id', auth(), async (req, res) => {
    const model = await Hero.findById(req.params.id)
    res.send(model)
  })

  // 更新指定id英雄数据
  router.put('/heroes/:id', auth(), async (req, res) => {
    const model = await Hero.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 根据id删除英雄数据
  router.delete('/heroes/:id', auth(), async (req, res) => {
    const model = await Hero.findByIdAndRemove(req.params.id)
    res.send(model)
  })

  /**文章区 */
  // 新建文章
  router.post('/articles', auth(), async (req, res) => {
    const model = await Article.create(req.body)
    res.send(model)
  })

  // 查询文章列表
  router.get('/articles', auth(), async (req, res) => {
    const model = await Article.find().limit(100)
    res.send(model)
  })

  // 根据id查询文章
  router.get('/articles/:id', auth(), async (req, res) => {
    const model = await Article.findById(req.params.id)
    res.send(model)
  })

  // 更新指定id文章数据
  router.put('/articles/:id', auth(), async (req, res) => {
    const model = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 根据指定id删除文章数据
  router.delete('/articles/:id', auth(), async (req, res) => {
    const model = await Article.findByIdAndRemove(req.params.id)
    res.send(model)
  })

  /**广告区 */
  // 新建广告
  router.post('/ads', auth(), async (req, res) => {
    const model = await Ad.create(req.body)
    res.send(model)
  })
  // 查询广告列表
  router.get('/ads', auth(), async (req, res) => {
    const model = await Ad.find().limit(100)
    res.send(model)
  })
  // 根据指定id查询广告
  router.get('/ads/:id', auth(), async (req, res) => {
    const model = await Ad.findById(req.params.id)
    res.send(model)
  })
  // 根据指定id更新广告
  router.put('/ads/:id', auth(), async (req, res) => {
    const model = await Ad.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 根据指定id删除广告
  router.delete('/ads/:id', auth(), async (req, res) => {
    const model = await Ad.findByIdAndRemove(req.params.id)
    res.send(model)
  })

  /**管理员区 */
  // 新建管理员
  router.post('/admin_users', auth(), async (req, res) => {
    const model = await AdminUser.create(req.body)
    res.send(model)
  })
  // 查询管理员列表
  router.get('/admin_users', auth(), async (req, res) => {
    const model = await AdminUser.find().limit(100)
    res.send(model)
  })
  // 根据指定id查询管理员
  router.get('/admin_users/:id', auth(), async (req, res) => {
    const model = await AdminUser.findById(req.params.id)
    res.send(model)
  })
  // 根据指定id更新管理员
  router.put('/admin_users/:id', auth(), async (req, res) => {
    const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 根据指定id删除管理员
  router.delete('/admin_users/:id', auth(), async (req, res) => {
    const model = await AdminUser.findByIdAndRemove(req.params.id)
    res.send(model)
  })

  // 上传图片
  const upload = multer({ dest: __dirname + '/../../uploads' })
  router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  /**登录模块 */
  router.post('/login', async (req, res) => {
    // 根据用户查询是否存在该用户
    const { username, password } = req.body
    const user = await AdminUser.findOne({username}).select('+password')// 由于模型里面设置了select:false，需要select('+password')才能取出密码
    if (!user) {
      return res.status(422).send({
        message: '用户名不存在！'
      })
    }
    // 效验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    if (!isValid) {
      return res.status(423).send({
        message: '密码错误！'
      })
    }
    // 返回token
    const token = jwt.sign({ id: user._id }, 'yan', {expiresIn: 3600})
    res.send({token})
  })

  app.use('/admin/api', router)
}