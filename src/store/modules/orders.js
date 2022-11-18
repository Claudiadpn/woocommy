/* eslint-disable */
import { orderService } from '../../services/order.service'
import { config } from "@/helpers/config";
import router from "@/router/index";

const state = { all: {}, pagination: {}, items: {}}

const actions = {
    getAllByDate({ dispatch, commit }, period) {
        commit('loader/activate', true, { root: true })
        orderService.getByDate(period, 1, 100)
            .then(
                ordersResponse => {
                    var orders = ordersResponse['items']
                    var pages = ordersResponse['pages']
                    if (pages > 1) {
                        for (let i = 2; i <= pages; i++) {
                            orderService.getByDate(period, i)
                                .then( ordersResponse => {
                                    orders.push(...ordersResponse['items'])
                                })
                        }
                    }
                    console.log("WOOCOMMY : Chargement des commandes terminé.")
                    commit('getSuccessOrders', orders)
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
    getPaginatedByDate({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })
        orderService.getByDate(data.period, data.page, config.defaultPerPage)
            .then(
                ordersResponse => {
                    console.log("WOOCOMMY : Chargement des commandes terminé.")
                    commit('getSuccessResponse', {response: ordersResponse, items: ordersResponse['items']})
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
    updateOrder({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })
        orderService.updateOrder(data)
            .then(
                data => {
                    console.log("WOOCOMMY : Commande bien modifiée.")
                    this._vm.flashMessage.success({
                        message: "Commande bien modifiée.",
                        title: "La commande est maintenant considérée comme traitée! "
                    });
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
    getSuccessOrders(state, orders) {
        state.all = orders
    },
    getSuccessResponse(state, data) {
        state.items = data.items
        state.pagination = {
            pages: data.response.pages,
            total: data.response.total
        }
    },
    getFailure(state) {
        state.items = {}
        state.pagination = {}
    }
}

export const orders = {
    namespaced: true,
    state,
    actions,
    mutations
}