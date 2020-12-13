import { debounce } from './utils.js'
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
    data () {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
         //1.图片加载完成的事件监听
         this.refresh = debounce(this.$refs.scroll.refresh,500)

         //对监听的事件进行保存
         this.itemImgListener = () =>{
             this.refresh()
         }
         this.$bus.$on('itemImageLoad' , () => {
             this.refresh()
 
         })
    }
}

export const backTopMinxin = {
    data (){
        return {
            showBackTop :false
        }
    },
    methods: {
        backTop (){
            this.$refs.scroll.scrollTo(0,0,300)
        }
    }
}

export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }
  