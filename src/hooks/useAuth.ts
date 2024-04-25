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
        localStorage.clear()
        localStorage.setItem('user-token', data.token)     
        localStorage.setItem('user-id', data.user.id)     
        localStorage.setItem('user-name', data.user.name)     
        localStorage.setItem('user-email', data.user.email)     
        localStorage.setItem('user-ra', data.user.ra)     
        localStorage.setItem('user-role', data.user.role)     
        localStorage.setItem('user-auth-day', (new Date()).getDate().toString())
    }

    const loginData = ref<ILoginState[]>(data);    

    return loginData 
}

export function authBasic(to, from, next) {
    const token = localStorage.getItem('user-token') != undefined    
    token ? next() : next('/login')    
}

export function authAdmin(to, from, next) {
    const token = localStorage.getItem('user-token') != undefined
    const role = String(getUserRole()) == '1:ADMIN'
    token && role ? next() : next('/login')    
}

export function authAdvisor(to, from, next) {
    const token = localStorage.getItem('user-token') != undefined
    const role = String(getUserRole()) == '2:ADVISOR'
    token && role ? next() : next('/login')    
}

export function authAuthor(to, from, next) {
    const token = localStorage.getItem('user-token') != undefined
    const role = String(getUserRole()) == '3:AUTHOR'
    token && role ? next() : next('/login')    
}

export function getUserRole(modestring = false) {
    try {
        let role = atob(localStorage.getItem('user-role') || '')        
        if (modestring) {
            role = role.split(':')[1]
        }
        return role
    }
    catch (e) {
       return 'null'
    }
}

export async function credentials() {
    let url = String(endpointUrl)
    let token = String(localStorage.getItem('user-token'))
    let authBearer = {'Authorization' : `Bearer ${token}`}

    return {
        url,
        token,
        authBearer,
    }
}
