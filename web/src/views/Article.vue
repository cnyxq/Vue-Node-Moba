<template>
  <div class="page-article" v-if="model">
    <div class="d-flex">
      <i class="iconfont icon-back"></i>
      <div class="flex-1">{{model.title}}</div>
      <div class="text-grey">2019-12-21</div>
    </div>
    <div class="content px-3" v-html="model.content"></div>
  </div>
</template>

<script>
export default {
  name: 'page-article',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      model: null
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    async getArticle () {
      const res = await this.$http.get(`/article/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style lang="scss">
.content {
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>