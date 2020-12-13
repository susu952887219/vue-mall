<template>
<div id="home">
    <!-- <h1>首页</h1> -->
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabControl1" 
                    class="tab-control"
                    v-show="isTrue">
    </tab-control>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp= "loadMore"><!--不加冒号传过去的是字符串的3，加冒号传过去的是表达式，数字类型的3-->
        <swiper-view :banners="banners" @swiperimageLoad="swiperimageLoad"></swiper-view>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabControl2">
        </tab-control>
        <goods-list :goods="showGoodsList"></goods-list>
       
    </scroll>

     <back-top @click.native="backClick" v-show="isTrue"></back-top>

    <!-- <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
        <li>48</li>
        <li>49</li>
        <li>50</li>
        <li>51</li>
        <li>52</li>
        <li>53</li>
        <li>54</li>
        <li>55</li>
        <li>56</li>
        <li>57</li>
        <li>58</li>
        <li>59</li>
        <li>60</li>
        <li>61</li>
        <li>62</li>
        <li>63</li>
        <li>64</li>
        <li>65</li>
        <li>66</li>
        <li>67</li>
        <li>68</li>
        <li>69</li>
        <li>70</li>
        <li>71</li>
        <li>72</li>
        <li>73</li>
        <li>74</li>
        <li>75</li>
        <li>76</li>
        <li>77</li>
        <li>78</li>
        <li>79</li>
        <li>80</li>
        <li>81</li>
        <li>82</li>
        <li>83</li>
        <li>84</li>
        <li>85</li>
        <li>86</li>
        <li>87</li>
        <li>88</li>
        <li>89</li>
        <li>90</li>
        <li>91</li>
        <li>92</li>
        <li>93</li>
        <li>94</li>
        <li>95</li>
        <li>96</li>
        <li>97</li>
        <li>98</li>
        <li>99</li>
        <li>100</li>
    </ul> -->


</div>
  
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import SwiperView from './childComps/SwiperView.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'


import { getHomeMultidata, getHomeGoods } from 'network/home.js'
import { debounce } from 'common/utils.js'
import { itemListenerMixin} from'common/mixin.js'



export default {
    name: 'Home',
    components: {
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,

        SwiperView,
        RecommendView,
        FeatureView,
        TabControl,
        TabControl,
       
    },
    minxins: [itemListenerMixin],
    data() {
        return {
            banners: [],
            recommends:[],
            goods: {
                'pop' : {page: 0,list: []},
                'new': {page: 0,list: []},
                'sell': {page: 0,list: []},
            },
            currentType: 'pop',
            isTrue: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,



        }
    },
    computed: {
        showGoodsList() {
            return this.goods[this.currentType].list
        }

    },
    //生命周期函数
    created() { 
        //1.请求多个数据
        this.getHomeMultidata(),
        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted (){
        //3.手动代码点击一次
        this.tabClick(0)
        
        //2.获取tabControl的OffsetTop
        //所有的组件都有一个属性$el:用于获取数组中的元素
        // this.tabOffsetTop = (this.$refs.tabControl.$el.offsetTop)

    },
    //钩子函数
    destroyed (){

    },
    activeted() {
        this.$refs.scroll.scrollTo(0 , this.saveY,1);
        
        this.$refd.scroll.refresh();

    },
    deactivated (){
        //1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY()
        //2.取消全局事件的监听
        this.$off('ItemImgLoad',this.ItemImgListener)

    },
    methods: {
        /*网络请求*/ 
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                console.log(res);//res函数执行完会被内存回收
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                console.log(res);
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;

                //完成上拉加载更多
                this.$refs.scroll.finishPullUp()

                
            })
        },
        /**事件监听 */
        tabClick (index){
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.showGoods = this.goods[this.currentType].list
            //让两个tabcontrol的currentIndex保持一致
            this.$refs.tabControl1.currentType = index;
                this.$refs.tabControl2.currentType = index;

            // if (this.$refs.tabControl1 !== undefined){
            //     this.$refs.tabControl1.currentType = index;
            //     this.$refs.tabControl2.currentType = index;
            // }
            
        },
        backlist (){
            this.$refs.scroll.scrollTo(0, 0)
        },
        contentScroll(position) {
            //1.判断BackTop是否显示
            this.isTrue = (-position.y) > 1000

            //2.决定tabControl是否吸顶（position:fixed)
            this.isTabFixed = (-position.y) > this.taboffsetTop



        },
        loadMore (){
            this.getHomeGoods(this.currentType)
        },
        swiperimageLoad (){
    
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        

    }


}
</script>

<style scoped>
#home {
    padding-top: 44px;
    height: 100vh;/*100%视口的高度*/ 
    position: relative;
}
.home-nav {
    background: var(--color-tint);
    color: #fff;
    font-weight: 600;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
/* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
} */

/* .content {
    height: calc(100% - 93px);
    margin-top: 44px
} */
.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
.tab-control{
    position: relative;
    z-index: 9;

}

</style>