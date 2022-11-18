/* eslint-disable */
import { securityService } from '../../services/security.service'
import router from "@/router/index";

const state = { user: null}

const actions = {
    login({ dispatch, commit }, userData) {
        commit('loader/activate', true, { root: true })
        securityService.login(userData)
            .then(
                response => {
                    commit('getSuccessLogin', response)
                    commit('loader/activate', false, { root: true })
                    router.push('/reports')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.info({
                        title: 'Bienvenue!',
                        time: 5000,
                        message: "Connection réussie !"
                    });
                },
                error => {
                    commit('getFailure')
                    commit('loader/activate', false, { root: true })
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        title: 'Erreur de connection',
                        message: "Erreur dans l'identifiant ou le mot de passe. Merci de réessayer."
                    });
                }
            )
    },
    logout({ dispatch, commit }) {
        commit('getSuccessLogout')
        router.push('/login')
        this._vm.flashMessage.setStrategy('multiple');
        this._vm.flashMessage.info({
            message: 'Déconnecté de Woocommy',
            title: "À bientôt!"
        });
    }
}

const mutations = {
    getSuccessLogout(state) {
        state.user = null
    },
    getSuccessLogin(state, user) {
        state.user = user
    },
    getFailure(state) {
        state.user = null
    }
}

export const security = {
    namespaced: true,
    state,
    actions,
    mutations
}