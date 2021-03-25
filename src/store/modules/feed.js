import feedApi from '@/api/feed'

const state = {
    data: null,
    isLoading: false,
    errors: null,
    tags: null,
}

export const mutationTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedSucces: '[feed] getFeedSucces',
    getFeedFailure: '[feed] getFeedFailure',

}

export const actionsTypes = {
    getFeed: '[feed] getFeed',
}

const mutations = {
    [mutationTypes.getFeedStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getFeedSucces](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getFeedFailure](state) {
        state.isLoading = false;
    },
}

const actions = {
    [actionsTypes.getFeed](context, {apiUrl}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getFeedStart)
            feedApi.getFeed(apiUrl)
                .then(response => {
                    context.commit(mutationTypes.getFeedSucces, response.data)
                    resolve(response.data)
                }) 
                .catch(() => {
                    context.commit.mutationTypes.getFeedFailure
                })
        })
    }
}

export const gettersTypes = {
    data: '[feed] data',
    isLoading: '[feed] isLoading',
    errors: '[feed] errors',
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