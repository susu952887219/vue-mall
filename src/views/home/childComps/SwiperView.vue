<template>
  <swiper>
        <swiper-item v-for="item in banners" :key="item.id"><!--v-for要使用key值，key值要独一无二的-->
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>

        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
export default {
    name: 'HomeSwiper',
    props: {
        banners: {//home.vue里面的数据，这里要用需要进行接收和注册
            type: Array,
            default() {
                return []
            }
        }
    },
    data (){
        return {
            isLoad: false

        }
        
    },
    components: {
        Swiper,
        SwiperItem,
    },
    methods: {
        imageLoad () {
            if (!this.isLoad){
                this.$emit('swiperimageLoad')
                this.isLoad = true
            }
            
        }
    }
}
</script>

<style>

</style>