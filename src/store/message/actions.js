export function addMessage({ commit }, payload) {
  if ('time' in payload) {
    commit('addMessage', { ...payload })
  } else {
    commit('addMessage', { time: Date.now(), ...payload })
  }
}
