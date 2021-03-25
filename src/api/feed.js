import axios from '@/api/axios'

const getFeed = apiUrl => {
    return axios.get(apiUrl)
}
const getTags = () => {
    return axios.get('/tags');
}
export default {
    getFeed,
    getTags
}