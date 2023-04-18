import { API_BASE_URL, API_KEY } from "./apiConfigs";
import axios from "axios";

declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> { }

}
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(config => {

    let params = config.params
    if (!params) {
        params = {}
    }
    params["api_key"] = API_KEY
    config.params = params

    return config
})
export default axiosInstance