import axios from 'axios'
import Cookies from 'js-cookie'

const instans = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}api/`,
})

instans.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${Cookies.get('token')}`

    return config
})

export default instans