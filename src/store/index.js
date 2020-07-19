import Vue from 'vue'
import Vuex from 'vuex'
import Artyom from 'artyom.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bingo: [
      { B: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] },
      { I: [ 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ] },
      { N: [ 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45 ] },
      { G: [ 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60 ] },
      { O: [ 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75 ] }
    ],
    tablero: [
      { B: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] },
      { I: [ 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ] },
      { N: [ 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45 ] },
      { G: [ 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60 ] },
      { O: [ 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75 ] }
    ],
    artyom: new Artyom()
  },
  getters: {
    getBingo: state => state.bingo,
    getTablero: state => state.tablero,
    getArtyom: state => state.artyom
  },
  mutations: {
    bingo: (state, data) => (state.bingo = data),
    tablero: (state, data) => (state.tablero = data)
  },
  actions: {
    setBingo({ commit }, data) {
      commit("bingo", data);
    },
    setTablero({ commit }, data) {
      commit("tablero", data);
    },
  },
  modules: {
  }
})
