import axios from 'axios';
import { credentials } from './useAuth';

const api = await credentials()

export async function logsList() {
    const { data } = await axios.get(`${api.url}/report/logs`, {
        headers: api.authBearer
    })

    return data
}

export async function submissionsByEventList() {
    const { data } = await axios.get(`${api.url}/report/submissions-by-event`, {
        headers: api.authBearer
    })

    return data
}