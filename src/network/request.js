import axios from 'axios'
// import { Toast } from "vant";
// import Loading from "../store/index";


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout:5000
    });
    //axios的拦截器
    instance.interceptors.request.use(config => {
        // 当getters里面的isLoading为true再显示请求加载
        // if (Loading.getters.isLoading) {
        //     Toast.loading({
        //       forbidClick: true,
        //       message: "加载中..."
        //     });
        //   } 
        return config;
    }, err => {
        // return Promise.reject(err);

    });
    //响应拦截
    instance.interceptors.response.use(res => {
        // Toast.clear();
        return res.data;
    }, err => {
        // Toast.clear();
        // return Promise.reject(err);
        console.log(err);

    });
    return instance(config);
}
