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
    console.log(filter)
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
    const { data } = await axios.get(`${api.url}/user/list?id=${id}`, {
        headers: api.authBearer
    })

    return ref<IUserState[]>(data[0])
}

export async function userAdd(infos) {    
    var params = new URLSearchParams()
    params.append('name', infos.name)
    params.append('description', infos.description)    

    const { data } = await axios.post(`${api.url}/user/add`, params)

    return data
}

export async function userEdit(infos) {
    var params = new URLSearchParams()
    params.append('id', infos.id)
    params.append('name', infos.name)
    params.append('description', infos.description)    

    const { data } = await axios.post(`${api.url}/user/edit`, params)

    return data
}

export async function userDel(id) {        
    const { data } = await axios.delete(`${api.url}/user/del/${id}`, {
        headers: api.authBearer
    })

    return data
}