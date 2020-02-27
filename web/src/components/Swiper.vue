<template>
  <div class="swiper-container">
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
  </div>
</template>

<script>
export default {
  name: 'swiper-container',
  data () {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
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

</style>