import http from './http'
export const loginApi = (params) => {
    return http.post('/user/login', params)
}
export const zhuceApi = (params) => {
    return http.post('/user/register', params)
}