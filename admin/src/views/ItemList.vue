<template>
  <div class="item-list">
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.icon">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/items/edit/${scope.row._id}`)" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'item-list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getItemList () {
      const res = await this.$http.get('items')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`此操作将永久删除该物品"${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`items/${row._id}`)
          this.getItemList()
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
    this.getItemList()
  }
}
</script>

<style scoped>
.item-list img{
  height: 3rem;
}
</style>