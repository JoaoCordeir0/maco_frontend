import axios from "axios";
import { ref } from "vue";
import { credentials } from "./useAuth";

const api = credentials();

export interface IArticleState {
    isLoading: boolean,
    message: String
}

export async function articleList() {
    const { data } = await axios.get(`${api.url}/article/list`, {
        headers: api.authBearer
    })

    if(typeof data[0] == 'object')
        return ref<IArticleState[]>(data)
    else
        return ref<IArticleState[]>([data])
}

export async function articleAdd(infos) {
    var params = new URLSearchParams()
    params.append('title', infos.title)
    params.append('author', infos.author)
    params.append('advisor', infos.advisor)
    params.append('keyword', infos.keyword)
    params.append('summary', infos.summary)
    params.append('status', infos.status)

    const { data } = await axios.post(`${api.url}/article/add`, params)

    return data
}