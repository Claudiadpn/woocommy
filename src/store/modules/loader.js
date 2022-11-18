/* eslint-disable */
const state = { isActive: false}

const mutations = {
    activate(state, value) {
        state.isActive = value
    }
}

const action = {}

export const loader = {
    namespaced: true,
    state,
    action,
    mutations
}