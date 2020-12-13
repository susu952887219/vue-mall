<template>
    <swiper class="detail-swiper">
        <swiper-item class="swiper-item"
                     v-for="item in topImages" :key="item.id"> 
            <img :src="item" alt="">

        </swiper-item>

    </swiper>
  
</template>

<script>
import {Swiper,SWiperItem} from 'components/common/swiper/index.js'
export default {
    name :'DetailSwiperView',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages: {
            type :Array,
            default (){
                return []
            }
        }

    }

}
</script>

<style>
.detail-swiper{
    height: 300px;
    overflow: hidden;

}

</style>