/* eslint-disable */
import { reportsService } from '../../services/reports.service'

const state = { all: {}, toCompare: {}}

const actions = {
    getAllByDateToCompare({ dispatch, commit }, period) {
        commit('loader/activate', true, { root: true })
        reportsService.getByDate(period)
            .then(
                reportsToCompare => {
                    console.log("WOOCOMMY : Chargement des statistiques à comparer terminé.")
                    commit('getSuccessReportsToCompare', reportsToCompare[0])
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailure')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "Une erreur est survenue"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    },
    getAllByDate({ dispatch, commit }, period) {
        commit('loader/activate', true, { root: true })
        reportsService.getByDate(period)
            .then(
                reports => {
                    console.log("WOOCOMMY : Chargement des statistiques terminé.")
                    commit('getSuccessReports', reports[0])
                    commit('loader/activate', false, { root: true })
                },
                error => {
                    commit('getFailure')
                    this._vm.flashMessage.setStrategy('multiple');
                    this._vm.flashMessage.error({
                        message: error,
                        title: "Une erreur est survenue"
                    });
                    commit('loader/activate', false, { root: true })
                }
            )
    }
}

const mutations = {
    getSuccessReports(state, reports) {
        state.all = reports
    },
    getSuccessReportsToCompare(state, reportsToCompare) {
        state.toCompare = reportsToCompare
    },
    getFailure(state) {
        state.all = {}
        state.toCompare = {}
    }
}

export const reports = {
    namespaced: true,
    state,
    actions,
    mutations
}