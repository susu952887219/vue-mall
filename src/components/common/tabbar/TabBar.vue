<template>
    <div id="tab-bar">
        <!-- <router-view></router-view> -->
        <slot></slot>
    </div>
  
</template>

<script>
export default {
    name: 'TabBar',
}
</script>

<style scoped>
#tab-bar{
  display:flex;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0; 

  box-shadow: 0 -1px 1px rbga(100,100,100,.2);

  z-index:2;

}


</style>