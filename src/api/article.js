import axios from '@/api/axios'

const getArticle = slug => {
    return axios.get(`/articles/${slug}`)
            .then(response => response.data.article)
}

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`)
}

const createArticle = articleForm => {
    console.log(articleForm)
    return axios.post(`/articles`, {article: articleForm})
            .then(response => response.data.article)
}

export default {
    getArticle,
    deleteArticle,
    createArticle
}