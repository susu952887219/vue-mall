<template>
  <div id="app">
    <keep-alive exclude="Detail"><!--跳转路由后回来还能保持原来的位置-->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
