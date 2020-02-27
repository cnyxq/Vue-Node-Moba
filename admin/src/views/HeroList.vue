<template>
  <div class="hero-list">
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" width="220" align="center"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="100" align="center"></el-table-column>
      <el-table-column prop="title" label="英雄外号" width="100" align="center"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height: 50px;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/heroes/edit/${scope.row._id}`)" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'hero-list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getHeroList () {
      const res = await this.$http.get('heroes')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`此操作将永久删除该物品"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`heroes/${row._id}`)
          this.getHeroList()
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
    this.getHeroList()
  }
}
</script>

<style scoped>

</style>