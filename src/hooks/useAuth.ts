import axios from 'axios';
import { ref } from 'vue';

const endpointUrl = import.meta.env.VITE_URL_API

export interface ILoginState {
    isLoading: boolean,   
    message: String,
    token: String
}

export async function apiLogin(email, password) {

    localStorage.clear();
    
    var params = new URLSearchParams()
    params.append('email', email)
    params.append('password', password)

    const { data } = await axios.post(`${endpointUrl}/user/login`, params)

    if (data.token != undefined) 
    {       
        localStorage.setItem('Token', data.token)            
        localStorage.setItem('AuthDay', (new Date()).getDate().toString())
    }

    const loginData = ref<ILoginState[]>(data);    

    return loginData 
}

export function auth(to, from, next) {
    localStorage.getItem('Token') != undefined ? next() : next('/login')    
}

export function getToken() {
    try {
        const token = localStorage.getItem('Token')
        return token
    }
    catch (e) {
        const token = 'null'
        return token
    }
}

export function credentials() {
    const url = String(endpointUrl)
    const token = String(getToken())
    const headers = { "Authorization": token }

    return {
        url,
        token,
        headers,
    }
}
