import axios from 'axios';
import { ref } from 'vue';
import { credentials } from './useAuth';

const api = credentials()

export interface ICourseState {
    isLoading: boolean,
    message: String,
}

export async function courseList() {
    const { data } = await axios.get(`${api.url}/course/list`, {
        headers: {'Authorization' : `Bearer ${api.token}`}
    })

    return ref<ICourseState[]>(data)
}

export async function courseDetails(id) {
    const { data } = await axios.get(`${api.url}/course/details/${id}`)

    return ref<ICourseState[]>(data['courses'][0])
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

export async function delcourse(id) {
    var params = new URLSearchParams()
    params.append('id', id)

    const { data } = await axios.post(`${api.url}/course/del`, params)

    return data
}