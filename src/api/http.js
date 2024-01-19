import axios from "axios";
const instance = axios.create({
    baseURL: '',
    timeout: 5000, //超时时间
})
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 把token加入请求头中, 不需要可以删除下面4句代码
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // 解决token错误或是过期
        if (response.data.code === 206) {
            removeToken()

            // 跳转登录页面
            if (router.history.current.fullPath !== '/login') {
                router.push('/login')
            }
        }
        // 把response的data返回给客户端, 不需要可以删除下面1句代码
        return response.data
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

export default instance