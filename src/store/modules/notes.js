/* eslint-disable */
import router from "@/router/index";
import { noteService } from "@/services/note.service";

const state = { all: {}}

const actions = {
    getNotes({ dispatch, commit }, id) {
        commit('loader/activate', true, { root: true })
        noteService.getNotes(id)
            .then(
                notes => {
                    commit('getSuccessNotes', notes)
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
    createNote({ dispatch, commit }, data) {
        commit('loader/activate', true, { root: true })
        noteService.createNote(data)
            .then(
                data => {
                    console.log("WOOCOMMY : Note bien crée.")
                    router.go()
                    this._vm.flashMessage.success({
                        message: "Note ajoutée.",
                        title: "Un e-mail contenant votre note a bien été envoyé au client."
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
    getFailure(state) {
        state.all = {}
    },
    getSuccessNotes(state, notes) {
        state.all = notes
    },
}

export const notes = {
    namespaced: true,
    state,
    actions,
    mutations
}