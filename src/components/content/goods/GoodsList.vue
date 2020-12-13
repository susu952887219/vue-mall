<template>
    <div class="goods-list">
        <goods-item v-for="item in goods" :key="item.id" :goodsItem="item"></goods-item>
        
    </div>
  
</template>

<script>
import GoodsItem from "./GoodsItem.vue"
export default {
    name: 'GoodsList',
    components: {
        GoodsItem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }

}
</script>

<style scoped>
.goods-lidt {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

}

</style>