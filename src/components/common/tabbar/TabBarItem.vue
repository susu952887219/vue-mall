<template>
    <div class="tab-bar-item" @click="handleClick">
        <!-- <router-view></router-view> -->
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
    </div>
</template>

<script>
export default {
    name: "TabBarItem",
    props: {
        path: {
            type: String,
        },
        activeColor: {
            type: String,
            default: 'red'
        }


    },
    data() {
        return {
            //  isActive: false,

        }
    },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1//不等于-1时，说明是活跃路由器的路径在跳转路径里面

        },
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}

        },
    },
    methods: {
        handleClick: function(){
            this.$router.replace(this.path);
        }
    },


}
</script>

<style scoped>

.tab-bar-item{
  flex: 1;/*均等分*/
  text-align : center;
  height: 49px;
  font-size: 14px;

}
.tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;

}
</style>