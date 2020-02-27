<template>
  <div class="ad-edit">
    <h1>{{id ? '编辑广告' : '新建广告'}}</h1>
    <el-form ref="Form">
      <el-form-item label="广告区名称" prop="name">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>
      <el-button type="text" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告区</el-button>
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col :md="12" v-for="(item, index) in model.items" :key="index">
          <el-form-item label="广告图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(item, 'icon', res.url)"
            >
              <img v-if="item.icon" :src="item.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="广告链接">
            <el-input type="text" v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="model.items.splice(index, 1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ad-edit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        name: '',
        items: []
      }
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('ads', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
      this.$router.push('/ads/list')
    },
    async getAd () {
      const res = await this.$http.get(`ads/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.getAd()
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>