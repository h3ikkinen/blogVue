import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null,
}

export const mutationTypes = {
    createArticleStart: '[createArticle] createArticleStart',
    createArticleSucces: '[createArticle] createArticleSucces',
    createArticleFailure: '[createArticle] createArticleFailure'
}

export const actionsTypes = {
    createArticle: '[createArticle] createArticle'
}

const mutations = {
    [mutationTypes.createArticleStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.createArticleSucces](state) {
        state.isSubmitting = false
    },
    [mutationTypes.createArticleFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
}

const actions = {
    [actionsTypes.createArticle](context, {articleForm}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createArticleStart)
            articleApi.createArticle(articleForm)
            .then(article => {
                context.commit(
                    mutationTypes.createArticleSucces, 
                    article
                )
                resolve(article)
            })
            .catch(result => {
                context.commit(
                    mutationTypes.createArticleFailure, 
                    result.response.data.errors
                )
            })
        })
    }
}

export default {
    state,
    actions,
    mutations,
}