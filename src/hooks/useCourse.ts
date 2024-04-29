import axios from 'axios';
import { ref } from 'vue';
import { credentials } from './useAuth';

const api = await credentials()

export interface ICourseState {
    isLoading: boolean,
    message: String,
}

export async function courseList() {
    const { data } = await axios.get(`${api.url}/course/list`, {
        headers: api.authBearer
    })

    return ref<ICourseState[]>(data)
}

export async function courseListByUser() {
    let id = localStorage.getItem('user-id')
    const { data } = await axios.get(`${api.url}/course/list?user_id=${id}`, {
        headers: api.authBearer
    })

    return ref<ICourseState[]>(data)
}

export async function courseDetails(id) {
    const { data } = await axios.get(`${api.url}/course/list?course_id=${id}`, {
        headers: api.authBearer
    })

    return ref<ICourseState[]>(data[0])
}

export async function courseAdd(infos) {    
    var params = new URLSearchParams()
    params.append('name', infos.name)
    params.append('description', infos.description)    

    const { data } = await axios.post(`${api.url}/course/add`, params)

    return data
}

export async function courseEdit(infos) {
    var params = new URLSearchParams()
    params.append('id', infos.id)
    params.append('name', infos.name)
    params.append('description', infos.description)    

    const { data } = await axios.post(`${api.url}/course/edit`, params)

    return data
}

export async function courseDel(id) {        
    const { data } = await axios.delete(`${api.url}/course/del/${id}`, {
        headers: api.authBearer
    })

    return data
}