<template>
  <div class="hero-container">
    <div class="topbar bg-black py-2 px-4 d-flex">
      <img src="../assets/logo.png" height="30px">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="top" :style="{'background-image': `url(${info.cover})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div>{{info.title}}</div>
        <h2 class="my-2">{{info.name}}</h2>
        <div>{{info.categories.map(v => v.name).join('/')}}</div>
        <div class="scores" v-if="info.scores">
          <span>难度</span>
          <span class="badge bg-primary">{{info.scores.difficulty}}</span>
          <span>技能</span>
          <span class="badge bg-primary">{{info.scores.skills}}</span>
          <span>功击</span>
          <span class="badge bg-primary">{{info.scores.attack}}</span>
          <span>生存</span>
          <span class="badge bg-primary">{{info.scores.survive}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero-container',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      info: {}
    }
  },
  created () {
    this.getHero()
  },
  methods: {
    async getHero () {
      const res = await this.$http.get(`/hero/${this.id}`)
      this.info = res.data
    }
  }
}
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.top {
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%;
}
.info {
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
  .scores {
    .badge {
      margin: 0 0.25rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      text-align: center;
      border-radius: 50%;
      line-height: 1rem;
      font-size: 0.8rem;
    }
  }
}

</style>