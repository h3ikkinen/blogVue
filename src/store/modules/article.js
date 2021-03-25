import articleApi from '@/api/article'

const state = {
    data: null,
    isLoading: false,
    errors: null,
}

export const mutationTypes = {
    getArticleStart: '[article] getArticlesStart',
    getArticleSucces: '[article] getArticleSucces',
    getArticleFailure: '[article] getArticleFailure',

    deleteArticleStart: '[article] deleteArticlesStart',
    deleteArticleSucces: '[article] deleteArticleSucces',
    deleteArticleFailure: '[article] deleteArticleFailure',
}
export const actionsTypes = { 
    getArticle: '[article] getArticle',
    deleteArticle: '[article] deleteArticle'
}

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getArticleSucces](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getArticleFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSucces]() {},
    [mutationTypes.deleteArticleFailure]() {},
}

const actions = { 
    [actionsTypes.getArticle](context, {slug}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart)
            articleApi.getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSucces, article)
                    resolve(article)
                }) 
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailure)
                })
        })
    },
    [actionsTypes.deleteArticle](context, {slug}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteArticleStart)
            articleApi.deleteArticle(slug)
                .then(() => {
                    context.commit(mutationTypes.deleteArticleSucces)
                    resolve()
                }) 
                .catch(() => {
                    context.commit(mutationTypes.deleteArticleFailure)
                })
        })
    }
}

export const gettersTypes = {
    data: '[article] data',
    isLoading: '[article] isLoading',
    errors: '[article] errors',
}


const getters = {
    [gettersTypes.data]: state => {
        return state.data
    },
    [gettersTypes.isLoading]: state => {
        return Boolean(state.isLoading)
    },
    [gettersTypes.errors]: state => {
        return state.errors
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}