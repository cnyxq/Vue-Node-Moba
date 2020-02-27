const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())
// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin/index')(app)
require('./routes/web/index')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})