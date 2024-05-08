import axios from 'axios';
import { ref } from 'vue';
import { credentials } from './useAuth';

const api = await credentials()

export interface IEventState {
    isLoading: boolean,
    message: String,
}

export async function eventList() {
    const { data } = await axios.get(`${api.url}/event/list`, {
        headers: api.authBearer
    })

    return ref<IEventState[]>(data)
}

export async function eventActiveList() {
    const { data } = await axios.get(`${api.url}/event/list?status=1`, {
        headers: api.authBearer
    })

    return ref<IEventState[]>(data)
}

export async function eventDetails(id) {
    const { data } = await axios.get(`${api.url}/event/list?event_id=${id}`, {
        headers: api.authBearer
    })

    return ref<IEventState[]>(data[0])
}

export async function eventAdd(infos) {    
    let params = {        
        'name': infos.name,
        'start': infos.start, 
        'end': infos.end,
        'number_characters': infos.chars,
        'status': infos.status
    }   

    const { data } = await axios.post(`${api.url}/event/add`, params, {
        headers: api.authBearer
    })

    return data
}

export async function eventEdit(infos) {
    let params = {
        'id': infos.id,
        'name': infos.name,
        'start': infos.start, 
        'end': infos.end,
        'number_characters': infos.chars,
        'status': infos.status
    }

    const { data } = await axios.post(`${api.url}/event/edit`, params, {
        headers: api.authBearer
    })

    return data
}

export async function eventDel(id) {        
    const { data } = await axios.delete(`${api.url}/event/del/${id}`, {
        headers: api.authBearer
    })

    return data
}