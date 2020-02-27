<template>
  <div class="ad-list">
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="广告区名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/ads/edit/${scope.row._id}`)" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ad-list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getAdList () {
      const res = await this.$http.get('ads')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`此操作将永久删除该广告分区"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`ads/${row._id}`)
          this.getAdList()
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
    this.getAdList()
  }
}
</script>

<style scoped>

</style>