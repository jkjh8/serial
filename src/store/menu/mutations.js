export function changeDrawer(state, payload) {
  if (payload) {
    state.drawer = false
  } else {
    state.drawer = !state.drawer
  }
}
