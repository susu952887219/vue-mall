<template>
<div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot='center' class="title">
            <div v-for="item in titles" :key="item.id" 
                 class="title-item"
                 @click= "titleClick">
                 {{item}}
            </div>
        </div>
    </nav-bar>
</div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name: 'DetainNavBar',
    components: {
        NavBar,
    },
    data (){
        return {
            titles: ['商品','参数','评论','推荐']
        }
    },
    methods :{
        titleClick (index){
            thos.currentIndex =  index;     
        },
        backClick (){
            this.$router.back()


        }

    },


}
</script>

<style scoped>
.title{
    display: flex;
}
.title-item{
    flex: 1;

}
.active {
    color: var(--color-high-text)
}
.back img{
    margin-top: 12px;

}

</style>