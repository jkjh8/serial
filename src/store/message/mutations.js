export function addMessage(state, payload) {
  state.message.unshift(payload)
  console.log(state.message)
}

export function clearMessage(state) {
  state.message = []
}

export function changeShowHex(state, payload) {
  state.showHex = payload
}
