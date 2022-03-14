import { Store } from '../store'

export const parsing = (args) => {
  console.log(args)
  switch (args.command) {
    case 'serialports':
      Store.commit('serial/updateSerialPorts', args.list)
      break
  }
}
