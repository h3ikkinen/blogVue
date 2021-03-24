// VUEX MODULE FOR REGISTER AND LOGIN 

import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage'


const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggetIn: null,
    isLoading: false,
}
//  MUTATIONS TYPES FOR AUTH MODULE
export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSucces: '[auth] registerSucces',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSucces: '[auth] loginSucces',
    loginFailure: '[auth] loginFailure',
    
    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSucces: '[auth] getCurrentUserSucces',
    getCurrentUserFailure: '[auth] getCurrentUserFailure'
}
//  ACTIONS TYPES FOR AUTH MODULE
export const actionsTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
}
//  GETTERS TYPES FOR AUTH MODULE
export const gettersTypes = {
    currentUser: '[auth] currentUser',
    isLoggetIn: '[auth] isLoggetIn',
    isAnonimus: '[auth] isAnonimus',
}

const getters = {
    [gettersTypes.currentUser]: state => {
        return state.currentUser;
    },
    [gettersTypes.isLoggetIn]: state => {
        return Boolean(state.isLoggetIn)
    },
    [gettersTypes.isAnonimus]: state => {
        return state.isLoggetIn === false
    }
}
const mutations = {
    // REGISTER ASYNC MUTATIONS
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSucces](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggetIn = true
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    // LOGIN ASYNC MUTATIONS
    [mutationTypes.loginStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginSucces](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggetIn = true
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
     // GET USER ASYNC MUTATIONS
    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSucces](state, payload) {
        state.isLoading = false
        state.currentUser = payload
        state.isLoggetIn = true
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.currentUser = null
        state.isLoggetIn = false
    },
}

const actions = {
    // REGISTER REQUEST     
    [actionsTypes.register](context, credentails) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi.register(credentails)
                .then(response => {
                    context.commit(mutationTypes.registerSucces, response.data.user)
                    setItem('accesToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors)
                })
        })
    },
    // LOGIN REQUEST  
    [actionsTypes.login](context, credentails) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart)
            authApi.login(credentails)
                .then(response => {
                    context.commit(mutationTypes.loginSucces, response.data.user)
                    setItem('accesToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors)
                })
        })
    },
    // GET USER REQUEST  
    [actionsTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi.getCurrentUser()
                .then(response => {
                    context.commit(mutationTypes.getCurrentUserSucces, response.data.user)
                    resolve(response.data.user)
                })
                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure)
                })
        })
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters,
}