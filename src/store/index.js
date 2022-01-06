import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'


// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      WHs: {
        "WH_one": {
          "type-one-1": [
            {
              product: "product-one-1-a",
              onHand: 0,
            },
            {
              product: "product-one-1-b",
              onHand: 58,
            },
            {
              product: "product-one-1-c",
              onHand: 56,
            },
            {
              product: "product-one-1-d",
              onHand: 65,
            },
            {
              product: "product-one-1-e",
              onHand: 98,
            },
            {
              product: "product-one-1-f",
              onHand: 88,
            },
            {
              product: "product-one-1-g",
              onHand: 66,
            },
            {
              product: "product-one-1-h",
              onHand: 21,
            },
            {
              product: "product-one-1-i",
              onHand: 11,
            },
            {
              product: "product-one-1-j",
              onHand: 35,
            },
            {
              product: "product-one-1-k",
              onHand: 78,
            },
          ],
          "type-one-2": [
            {
              product: "product-one-2-a",
              onHand: 55,
            },
            {
              product: "product-one-2-b",
              onHand: 58,
            },
            {
              product: "product-one-2-c",
              onHand: 56,
            },
            {
              product: "product-one-2-d",
              onHand: 65,
            },
            {
              product: "product-one-2-e",
              onHand: 98,
            },
            {
              product: "product-one-2-f",
              onHand: 88,
            },
            {
              product: "product-one-2-g",
              onHand: 66,
            },
            {
              product: "product-one-2-h",
              onHand: 21,
            },
            {
              product: "product-one-2-i",
              onHand: 11,
            },
            {
              product: "product-one-2-j",
              onHand: 35,
            },
            {
              product: "product-one-2-k",
              onHand: 78,
            },
          ],
          "type-one-3": [
            {
              product: "product-one-3-a",
              onHand: 55,
            },
            {
              product: "product-one-3-b",
              onHand: 58,
            },
            {
              product: "product-one-3-c",
              onHand: 56,
            },
            {
              product: "product-one-3-d",
              onHand: 65,
            },
            {
              product: "product-one-3-e",
              onHand: 98,
            },
            {
              product: "product-one-3-f",
              onHand: 88,
            },
            {
              product: "product-one-3-g",
              onHand: 66,
            },
            {
              product: "product-one-3-h",
              onHand: 21,
            },
            {
              product: "product-one-3-i",
              onHand: 11,
            },
            {
              product: "product-one-3-j",
              onHand: 35,
            },
            {
              product: "product-one-3-k",
              onHand: 78,
            },
          ],
        },
        "WH_two": {
          "type-two-1": [
            {
              product: "product-two-1-a",
              onHand: 55,
            },
            {
              product: "product-two-1-b",
              onHand: 58,
            },
            {
              product: "product-two-1-c",
              onHand: 56,
            },
            {
              product: "product-two-1-d",
              onHand: 65,
            },
            {
              product: "product-two-1-e",
              onHand: 98,
            },
            {
              product: "product-two-1-f",
              onHand: 88,
            },
            {
              product: "product-two-1-g",
              onHand: 66,
            },
            {
              product: "product-two-1-h",
              onHand: 21,
            },
            {
              product: "product-two-1-i",
              onHand: 11,
            },
            {
              product: "product-two-1-j",
              onHand: 35,
            },
            {
              product: "product-two-1-k",
              onHand: 78,
            },
          ],
          "type-two-2": [
            {
              product: "product-two-2-a",
              onHand: 55,
            },
            {
              product: "product-two-2-b",
              onHand: 58,
            },
            {
              product: "product-two-2-c",
              onHand: 56,
            },
            {
              product: "product-two-2-d",
              onHand: 65,
            },
            {
              product: "product-two-2-e",
              onHand: 98,
            },
            {
              product: "product-two-2-f",
              onHand: 88,
            },
            {
              product: "product-two-2-g",
              onHand: 66,
            },
            {
              product: "product-two-2-h",
              onHand: 21,
            },
            {
              product: "product-two-2-i",
              onHand: 11,
            },
            {
              product: "product-two-2-j",
              onHand: 35,
            },
            {
              product: "product-two-2-k",
              onHand: 78,
            },
          ],
          "type-two-3": [
            {
              product: "product-two-3-a",
              onHand: 55,
            },
            {
              product: "product-two-3-b",
              onHand: 58,
            },
            {
              product: "product-two-3-c",
              onHand: 56,
            },
            {
              product: "product-two-3-d",
              onHand: 65,
            },
            {
              product: "product-two-3-e",
              onHand: 98,
            },
            {
              product: "product-two-3-f",
              onHand: 88,
            },
            {
              product: "product-two-3-g",
              onHand: 66,
            },
            {
              product: "product-two-3-h",
              onHand: 21,
            },
            {
              product: "product-two-3-i",
              onHand: 11,
            },
            {
              product: "product-two-3-j",
              onHand: 35,
            },
            {
              product: "product-two-3-k",
              onHand: 78,
            },
          ],
        },
        "WH_three": {
          "type-three-1": [
            {
              product: "product-three-1-a",
              onHand: 55,
            },
            {
              product: "product-three-1-b",
              onHand: 58,
            },
            {
              product: "product-three-1-c",
              onHand: 56,
            },
            {
              product: "product-three-1-d",
              onHand: 65,
            },
            {
              product: "product-three-1-e",
              onHand: 98,
            },
            {
              product: "product-three-1-f",
              onHand: 88,
            },
            {
              product: "product-three-1-g",
              onHand: 66,
            },
            {
              product: "product-three-1-h",
              onHand: 21,
            },
            {
              product: "product-three-1-i",
              onHand: 11,
            },
            {
              product: "product-three-1-j",
              onHand: 35,
            },
            {
              product: "product-three-1-k",
              onHand: 78,
            },
          ],
          "type-three-2": [
            {
              product: "product-three-2-a",
              onHand: 55,
            },
            {
              product: "product-three-2-b",
              onHand: 58,
            },
            {
              product: "product-three-2-c",
              onHand: 56,
            },
            {
              product: "product-three-2-d",
              onHand: 65,
            },
            {
              product: "product-three-2-e",
              onHand: 98,
            },
            {
              product: "product-three-2-f",
              onHand: 88,
            },
            {
              product: "product-three-2-g",
              onHand: 66,
            },
            {
              product: "product-three-2-h",
              onHand: 21,
            },
            {
              product: "product-three-2-i",
              onHand: 11,
            },
            {
              product: "product-three-2-j",
              onHand: 35,
            },
            {
              product: "product-three-2-k",
              onHand: 78,
            },
          ],
          "type-three-3": [
            {
              product: "product-three-3-a",
              onHand: 55,
            },
            {
              product: "product-three-3-b",
              onHand: 58,
            },
            {
              product: "product-three-3-c",
              onHand: 56,
            },
            {
              product: "product-three-3-d",
              onHand: 65,
            },
            {
              product: "product-three-3-e",
              onHand: 98,
            },
            {
              product: "product-three-3-f",
              onHand: 88,
            },
            {
              product: "product-three-3-g",
              onHand: 66,
            },
            {
              product: "product-three-3-h",
              onHand: 21,
            },
            {
              product: "product-three-3-i",
              onHand: 11,
            },
            {
              product: "product-three-3-j",
              onHand: 35,
            },
            {
              product: "product-three-3-k",
              onHand: 78,
            },
          ],
        }
      },
      finalData: []
    },
    mutations: {
      serveData(state, payload) {
        state.finalData = payload
      },
    },
    actions: {
      serveData({ commit }, payload) {
        commit("serveData", payload)
      },
    },
    modules: {
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
