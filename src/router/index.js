import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue'),
      Category = () => import('views/category/Category.vue'),
      Profile = () => import('views/profile/Profile.vue'),
      Cart= () => import('views/cart/Cart.vue'),
      Detail = () => import('views/detail/Detail.vue');



//安装插件
Vue.use(VueRouter)
//配置路由对象
const routes = [
    {
        path: '',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/detail/:iid',
        component: Detail,
    },


]
//实例化VueRouter对象
const router = new VueRouter({
    routes,
    mode: 'history',
})

//导出对象
export default router