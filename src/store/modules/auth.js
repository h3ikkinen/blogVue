import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage'


const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggetIn: null,
}

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSucces: '[auth] registerSucces',
    registerFailure: '[auth] registerFailure',
    loginStart: '[auth] loginStart',
    loginSucces: '[auth] loginSucces',
    loginFailure: '[auth] loginFailure'
}
export const actionsTypes = {
    register: '[auth] register',
    login: '[auth] login'
}
const mutations = {
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
}

const actions = {
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
}

export default {
    state,
    mutations,
    actions,
}