<template>
  <div class="card-container">
    <div class="card bg-white mu-3 p-3">
      <div class="card-header d-flex pd-3">
        <i class="iconfont" :class="icon1"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont" :class="icon2"></i>
      </div>
      <div class="card-body pu-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-container',
  props: {
    title: {
      type: String,
      required: true
    },
    icon1: {
      type: String,
      required: true
    },
    icon2: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.card-container {
  .card {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
  }
}
</style>