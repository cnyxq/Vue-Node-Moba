<template>
  <div class="article-edit">
    <h1>{{id ? '编辑文章' : '新建文章'}}</h1>
    <el-form ref="Form">
      <el-form-item label="所属类别">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input type="text" v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
  name: 'article-edit',
  props: {
    id: String
  },
  data () {
    return {
      model: {
        title: '',
        categories: [],
        content: ''
      },
      categories: []
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('articles', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
      this.$router.push('/articles/list')
    },
    async getArticle () {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    },
    async getCategories () {
      const res = await this.$http.get('categories')
      this.categories = res.data
    },
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append("file", file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url)
      resetUploader()
    }
  },
  created () {
    this.getCategories()
    this.id && this.getArticle()
  },
  components: {
    VueEditor
  }
}
</script>

<style scoped>

</style>