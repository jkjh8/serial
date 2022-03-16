export function addMessage(state, payload) {
  state.message.unshift(payload)
}

export function clearMessage(state) {
  state.message = []
}

export function changeShowHex(state, payload) {
  state.showHex = payload
}

export function updateFilter(state, payload) {
  state.filter = payload
}
