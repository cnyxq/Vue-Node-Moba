<template>
  <div class="category-edit">
    <h1>{{id ? '编辑分类' : '新建分类'}}</h1>
    <el-form ref="Form">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'category-edit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        name: '',
      },
      parents: []
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('categories', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
      this.$router.push('/categories/list')
    },
    async getCategory () {
      const res = await this.$http.get(`categories/${this.id}`)
      this.model.name = res.data.name
    },
    async getParents () {
      const res = await this.$http.get('categories')
      this.parents = res.data
    }
  },
  created () {
    this.getParents()
    this.id && this.getCategory()
  }
}
</script>

<style scoped>

</style>