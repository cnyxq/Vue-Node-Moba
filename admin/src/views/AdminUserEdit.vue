<template>
  <div class="admin-user-edit">
    <h1>{{id ? '编辑管理员' : '新建管理员'}}</h1>
    <el-form ref="Form">
      <el-form-item label="用户名">
        <el-input type="text" v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'admin-user-edit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`admin_users/${this.id}`, this.model)
      } else {
        res = await this.$http.post('admin_users', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
      this.$router.push('/admin_users/list')
    },
    async getAdminUser () {
      const res = await this.$http.get(`admin_users/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.getAdminUser()
  }
}
</script>

<style scoped>

</style>