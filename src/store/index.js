import Vue from 'vue';
import Vuex from 'vuex';

import { loader } from './modules/loader';
import { orders } from './modules/orders';
import { notes } from './modules/notes';
import { reports } from './modules/reports';
import { security } from './modules/security';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    orders,
    notes,
    reports,
    security,
    loader
  }
});