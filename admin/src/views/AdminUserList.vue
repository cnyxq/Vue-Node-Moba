<template>
  <div class="admin-user-list">
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/admin_users/edit/${scope.row._id}`)" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'admin-user-list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getAdminUserList () {
      const res = await this.$http.get('admin_users')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`此操作将永久删除该分类"${row.username}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`admin_users/${row._id}`)
          this.getAdminUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
        });
    }
  },
  created () {
    this.getAdminUserList()
  }
}
</script>

<style scoped>

</style>