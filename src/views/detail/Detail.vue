<template>

<div id="detail">
    <detail-nav-ba class="detail-nav" @titleClick="titleClick"></detail-nav-ba>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probr-type="3">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info ：goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
        <derail-params-info ref="params" :params-info="paramsInfo"></derail-params-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    
    
</div>
  
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'




import { getDetail, Goods, Shop, GoodsParams, getRecomment } from 'network/detail.js'
import Swiper from 'components/common/swiper/Swiper.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import { itemListenerMixin, backTopMinxin } from'common/mixin.js'

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,

        Scroll,
        Swiper,
        GoodsList,

    },
    data () {
    return {
        iid: null,
        topImages: [],
        goods:{},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: null,

        }

    },
    created (){
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
           //1.获取顶部的图片轮播数据
           const data = res.result;
           this.topImages = res.result.itemInfo.topImages

           //2.获取商品信息
           this.goods = new GetDeatilBaseData(data.itemInfo,data.columns,data.shopInfo.services)

           //3.获取店铺信息的对象
           this.shop = new GetDetailShopInfo(data.shopInfo)

           //4.获取商品详情信息
           this.detailInfo = data.datailInfo

           //获取参数信息
           this.paramsInfo = this.GoodsParams(data.itenParams.info,data.itemParams.rules)

           //获取评论信息
           if (data.rate.cRate !== 0){
               This.commentInfo = this.data.rate.list[0]
           }
        })
        
        //3.请求推荐信息
        getRecomment ().then(res => {
            this.recommends = res.data.list

        })

    },
    mounted() {

    },
    update() {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refd.params.$el.offsetTop);
        this.themeTopYs.push(this.$refd.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refd.recommend.$el.offsetTop);

    },
    minxin: [ itemListenerMixin, backTopMinxin ],
    methods: {
        imgLoad() {
            this.refresh()
            // if (this.$route.path.indexOf('/home')) {
            //     this.$refs.scroll.refresh()
            // }else if (this.$route.path.indexOf('/detail')) {
            //     this.$bus.$emit('detailItemImgLoad')
            // }
        },
        titleClick (index) {
            this.$refs.scroll.scrollTo(0,-this.themeTopYs,100)
        },
        contentScroll(position) {
            //获取Y值
            const positionY = -position.y

            let length = this.themeTopYs.length
            for(let i =0;i < length; i++ ) {
                if (this.currentIndex !== i &&((i< length - 1 && positionY >= this.themeTopYs[i] && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
                || (i === length -1 && positionY > this.themeTopYs[i]))) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }

        }
    },



}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;

}
.content {
    height: calc(100% - 44px - 49px);
}


.product-detail {
  width: 100%;
  height: 100%;
}

/* BScroll固定高度和区域 */
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}

/* vue的淡入淡出动画 */
.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.3s;
}

.scroll-enter,
.scroll-leave-to {
  opacity: 0;
}

.scroll-enter-to,
.scroll-leave {
  opacity: 1;
}


</style> 