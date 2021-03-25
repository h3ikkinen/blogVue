import feedApi from '@/api/feed'

const state = {
    tags: null,
    isLoading: false,
    errors: null,
}

export const mutationTypes = {
    getTagsStart: '[tags] getTagsStart',
    getTagsSucces: '[tags] getTagsSucces',
    getTagsFailure: '[tags] getTagsFailure',
}
export const actionsTypes = { 
    getTags: '[tags] getTags'
}

const mutations = {
    [mutationTypes.getTagsStart](state) {
        state.isLoading = true;
        state.tags = null;
    },
    [mutationTypes.getTagsSucces](state, payload) {
        state.isLoading = false;
        state.tags = payload;
    },
    [mutationTypes.getTagsFailure](state) {
        state.isLoading = false;
    }
}

const actions = { 
    [actionsTypes.getTags](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getTagsStart)
            feedApi.getTags()
                .then(response => {
                    context.commit(mutationTypes.getTagsSucces, response.data)
                    resolve(response.data)
                }) 
                .catch(() => {
                    context.commit.mutationTypes.getTagsFailure
                })
        })
    }
}

export const gettersTypes = {
    tags: '[tags] data',
    isLoading: '[tags] isLoading',
    errors: '[tags] errors',
}


const getters = {
    [gettersTypes.tags]: state => {
        return state.tags
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