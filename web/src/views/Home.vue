<template>
  <div class="home-container">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/img1.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img2.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img3.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination text-right px-3 pd-2" slot="pagination"></div>
    </swiper>
    <div class="nav-icon mu-3 bg-white pu-3 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item md-3" v-for="(item,index) in 10" :key="index">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- <m-card :title="'新闻资讯'" :icon1="'menu'" :icon2="'back'">
      <div class="nav">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div>
        <swiper>
          <swiper-slide v-for="(item, index) in 5" :key="index">
            <div class="fs-xl py-2" v-for="(item, index) in 5" :key="index">
              <span>[新闻]</span>
              <span>|</span>
              <span>12月17日全服不停机更新公告</span>
              <span>12/16</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> -->
    <m-list-card :title="'新闻资讯'" :icon1="'icon-menu'" :icon2="'icon-back'" :newsCats="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/article/${item._id}`" class="fs-lg py-2 d-flex" v-for="(item, index) in category.newsList" :key="index">
          <span class="text-grey">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-ellipsis pr-1">{{item.title}}</span>
          <span class="text-grey">{{item.createdAt | date}}</span>
      </router-link>
      </template>
    </m-list-card>

    <m-list-card :title="'英雄列表'" :icon1="'icon-card-hero'" :icon2="'icon-back'" :newsCats="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/hero/${item._id}`" class="p-2 text-center" style="width: 20%;" v-for="(item, index) in category.heroList" :key="index">
            <img :src="item.avatar" class="w-100">
            <div>{{item.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-list-card :title="'新闻资讯'" :icon1="'icon-menu'" :icon2="'icon-back'"></m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import ListCard from '../components/ListCard'
export default {
  name: 'home-container',
  data () {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newsCats: [],
      heroCats: []
    }
  },
  filters: {
    // 格式化日期
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  },
  methods: {
    async getNewsCats () {
      const res = await this.$http.get('/news/list')
      this.newsCats = res.data
    },
    async getHeroCats () {
      const res = await this.$http.get('/heros/list')
      this.heroCats = res.data
    }
  },
  created () {
    this.getNewsCats()
    this.getHeroCats()
  },
  components: {
    'm-list-card': ListCard
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.swiper-pagination {
  .swiper-pagination-bullet {
    border-radius: 2px;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'grey');
    }
  }
}
.nav-icon {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}
.card-header {
  border-bottom: 1px solid $border-color;
}
</style>