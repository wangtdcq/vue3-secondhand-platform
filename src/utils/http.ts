import axios, { Axios, AxiosInstance, AxiosRequestConfig } from 'axios'
// import { ElMessage } from 'element-plus'

const HttpInstance: AxiosInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  // timeou: 5000, //5秒
})

// axios请求拦截器
HttpInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// axios响应式拦截器
HttpInstance.interceptors.response.use(
  (response) => {
    const res = response.data
    // if (res.code && res.code !== 200) {
    //   ElMessage.error(res.message || '系统错误了')
    //   if (res.code === 401) {
    //     handleLoginExpire()
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  (e) => {
    return Promise.reject(e)
  },
)
// function handleLoginExpire() {
//   localStorage.removeItem('token')
//   router.push({
//     path: '/login',
//     query: { redirect: router.currentRoute.value.fullPath },
//   })
// }

interface IHttpInstance extends AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

const httpInstance = HttpInstance as IHttpInstance
export default httpInstance
