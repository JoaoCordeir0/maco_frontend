import axios from "axios";
import { ref } from "vue";
import { credentials } from "./useAuth";

const api = await credentials();

export interface IArticleState {
    isLoading: boolean,
    message: String
}

export async function articleList(filter) {
    let path = '/article/list/admin'
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

export async function submissionsList(level, filter) {    
    const { data } = await axios.get(`${api.url}/article/list/${level}?${filter}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data)
}

export async function articleDetails(id) {
    const { data } = await axios.get(`${api.url}/article/list/admin?article_id=${id}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function submissionDetails(article) {
    const { data } = await axios.get(`${api.url}/article/list/advisor?article_id=${article}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function articleAdd(infos) {
    var params = new URLSearchParams()    
    params.append('event', infos.event)
    params.append('title', infos.title)
    params.append('authors', infos.authors)
    params.append('advisors', infos.advisors)
    params.append('keywords', infos.keywords)
    params.append('summary', infos.summary)
    params.append('status', infos.status)
       
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