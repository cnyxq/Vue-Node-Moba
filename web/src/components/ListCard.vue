<template>
  <div class="list-card-container">
    <m-card :icon1="icon1" :icon2="icon2" :title="title">
      <div class="nav">
        <div class="nav-item" :class="{ active: active === index }" v-for="(item, index) in newsCats" :key="index">
          <div class="nav-link" @click="$refs.list.swiper.slideTo(index)">{{item.name}}</div>
        </div>
      </div>
      <div>
        <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex" :options="{ autoHeight: true }">
          <swiper-slide v-for="(category, index) in newsCats" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'list-card-container',
  props: {
    icon1: { type: String, required: true },
    icon2: { type: String, required: true },
    title: { type: String, required: true },
    newsCats: { type: Array, required: true }
  },
  data () {
    return {
      active: 0
    }
  },
  components: {
    'm-card': Card
  }
}
</script>

<style scoped>

</style>