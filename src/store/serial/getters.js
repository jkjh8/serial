export function getPath(state) {
  return state.serialports.map((e) => e.path)
}
