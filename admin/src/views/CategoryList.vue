<template>
  <div class="category-list">
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'category-list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getCategoryList () {
      const res = await this.$http.get('categories')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`此操作将永久删除该分类"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`categories/${row._id}`)
          this.getCategoryList()
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
    this.getCategoryList()
  }
}
</script>

<style scoped>

</style>