import {request} from "./request.js"
/*没有用default导出变量要加大括号*/

export function getHomeMultidata() {
    return request({
        url: "/home/multidata"
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: "/home/data",
        params: {
            type,
            page
        }
    })
}