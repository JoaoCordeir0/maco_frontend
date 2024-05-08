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

export async function submissionDetails(level, article) {
    const { data } = await axios.get(`${api.url}/article/list/${level}?article_id=${article}`, {
        headers: api.authBearer
    })

    return ref<IArticleState[]>(data[0])
}

export async function submissionDelete(articleID) {
    const { data } = await axios.delete(`${api.url}/article/del/${articleID}`, {
        headers: api.authBearer
    })

    return data
}

export async function authorDelete(article, user) {    
    const { data } = await axios.delete(`${api.url}/article/author/del/${article}/${user}`, {
        headers: api.authBearer,        
    })

    return data
}

export async function articleAdd(params) {
       
    const { data } = await axios.post(`${api.url}/article/add`, params, {
        headers: api.authBearer
    })

    return data
}

export async function articleEditStatus(article, status) {
    let params = {
        'id': article,
        'status': status,
    }

    const { data } = await axios.post(`${api.url}/article/status`, params, {
        headers: api.authBearer
    })

    return data
}

export async function articleAddComment(article, comment) {    
    let params = {
        'article': article,
        'comment': comment,
    }

    const { data } = await axios.post(`${api.url}/article/comment`, params, {
        headers: api.authBearer
    })

    return data
}