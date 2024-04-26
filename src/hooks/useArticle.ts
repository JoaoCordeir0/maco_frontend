import axios from "axios";
import { ref } from "vue";
import { credentials } from "./useAuth";

const api = await credentials();

export interface IArticleState {
    isLoading: boolean,
    message: String
}

export async function articleList() {
    const { data } = await axios.get(`${api.url}/article/list`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data)
}

export async function submissionsList() {
    let id = localStorage.getItem('user-id')
    const { data } = await axios.get(`${api.url}/article/list/advisor/${id}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data)
}

export async function articleDetails(id) {
    const { data } = await axios.get(`${api.url}/article/list?article_id=${id}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function submissionDetails(article) {
    let id = localStorage.getItem('user-id')
    const { data } = await axios.get(`${api.url}/article/list/advisor/${id}?article_id=${article}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function articleAdd(infos) {
    var params = new URLSearchParams()
    params.append('user', infos.user)
    params.append('title', infos.title)
    params.append('author', infos.author)
    params.append('advisor', infos.advisor)
    params.append('keyword', infos.keyword)
    params.append('summary', infos.summary)
       
    const { data } = await axios.post(`${api.url}/article/add`, params)

    return data
}

export async function articleEditStatus(article, status) {
    var params = new URLSearchParams()
    params.append('id', article)
    params.append('status', status)    

    const { data } = await axios.post(`${api.url}/article/status`, params, {
        headers: api.authBearer
    })

    return data
}