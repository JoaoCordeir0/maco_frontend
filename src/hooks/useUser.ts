import axios from 'axios';
import { ref } from 'vue';
import { credentials } from './useAuth';

const api = await credentials()

export interface IUserState {
    isLoading: boolean,
    message: String,
}

export async function userList(mode, filter) {
    let path = ''    
    if (filter.user_info != undefined) {
        path = `&user_info=${filter.user_info}&article_id=${filter.article_id}`
    }
    if (filter.user_role != undefined) {
        path = `&user_role=${filter.user_role}`
    }
    
    const { data } = await axios.get(`${api.url}/user/list?mode=${mode}${path}`, {
        headers: api.authBearer
    })

    return ref<IUserState[]>(data)
}

export async function userDetails(id) {
    const { data } = await axios.get(`${api.url}/user/list?user_id=${id}`, {
        headers: api.authBearer
    })

    return ref<IUserState[]>(data[0])
}

export async function userAdd(params) {        
    const { data } = await axios.post(`${api.url}/user/register`, params)

    return data
}

export async function userEdit(params) {    
    const { data } = await axios.post(`${api.url}/user/edit`, params, {
        headers: api.authBearer,        
    })

    return data
}

export async function userDel(id) {        
    const { data } = await axios.delete(`${api.url}/user/del/${id}`, {
        headers: api.authBearer
    })

    return data
}

export function userFormatCPF(cpf) {            
    cpf = cpf.replace(/[^\d]/g, "");                    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}