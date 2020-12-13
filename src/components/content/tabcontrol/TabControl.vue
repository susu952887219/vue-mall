<template>
  <div class="tabcontrol">
      <div v-for="(item,index) in  titles" :key="item.id" 
            class= "tabcontrol-item" 
            :class="{active: index === currentIndex}" 
            @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
      

  </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data (){
        return {
            currentIndex: 0,

        }
    },
    methods: {
        itemClick: function(index) {
            this.currentIndex = index;
            this.$emit('tabClick',index)

        }
    }

}
</script>

<style scoped>
.tabcontrol {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background: #fff;
}
.tabcontrol-item {
    flex: 1;
}

.tabcontrol-item span{
    padding: 5px;
}
.active {
    color: var(--color-high-text);
    
}
.active span {
    border-bottom: 3px solid var(--color-tint);

}


</style>