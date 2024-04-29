import axios from "axios";
import { ref } from "vue";
import { credentials } from "./useAuth";

const api = await credentials();

export interface IArticleState {
    isLoading: boolean,
    message: String
}

export async function articleList(filter) {
    let path = '/article/admin/list'
    let char = '?'
    if (filter.status != undefined && filter.status != 0) {
        path = `${path}?article_status=${filter.status}`
        char = '&'
    }        
    if (filter.course != undefined && filter.course != 0) {        
        path = `${path}${char}course_id=${filter.course}`
        char = '&'
    }
    if (filter.event != undefined && filter.event != 0) {        
        path = `${path}${char}event_id=${filter.event}`
        char = '&'
    }

    const { data } = await axios.get(`${api.url}${path}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data)
}

export async function submissionsList() {    
    const { data } = await axios.get(`${api.url}/article/advisor/list`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data)
}

export async function articleDetails(id) {
    const { data } = await axios.get(`${api.url}/article/admin/list?article_id=${id}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function submissionDetails(article) {
    const { data } = await axios.get(`${api.url}/article/advisor/list?article_id=${article}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function articleAdd(infos) {
    var params = new URLSearchParams()    
    params.append('title', infos.title)
    params.append('author', infos.author)
    params.append('advisor', infos.advisor)
    params.append('keyword', infos.keyword)
    params.append('summary', infos.summary)
       
    const { data } = await axios.post(`${api.url}/article/add`, params, {
        headers: api.authBearer
    })

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

export async function articleAddComment(article, comment) {    
    var params = new URLSearchParams()
    params.append('article', article)    
    params.append('comment', comment)    

    const { data } = await axios.post(`${api.url}/article/comment`, params, {
        headers: api.authBearer
    })

    return data
}