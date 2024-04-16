import axios from 'axios';
import { ref } from 'vue';
import { credentials } from './useAuth';

const api = credentials()

export interface IUserState {
    isLoading: boolean,
    message: String,
}

export async function userList() {
    const { data } = await axios.get(`${api.url}/user/list?user_id=4`, {
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