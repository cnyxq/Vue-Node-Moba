<template>
  <div class="item-edit">
    <h1>{{id ? '编辑物品' : '新建物品'}}</h1>
    <el-form ref="Form">
      <el-form-item label="名称" prop="name">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'item-edit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        name: '',
        icon: ''
      }
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('items', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
      this.$router.push('/items/list')
    },
    async getItem () {
      const res = await this.$http.get(`items/${this.id}`)
      this.model.name = res.data.name
      this.model.icon = res.data.icon
    },
    afterUpload (res) {
      this.model.icon = res.url
    }
  },
  created () {
    this.id && this.getItem()
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>