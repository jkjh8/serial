import { BrowserWindow, ipcMain } from 'electron'
import { getPort } from '../serial'
import {
  createTCPServer,
  distoryTCPServer,
  connectTCPServer,
  disconnectTCPServer
} from '../tcp'

function rtMsg(args) {
  BrowserWindow.fromId(1).webContents.send('onResponse', args)
}

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'start':
      rtMsg({ command: 'serialports', list: await getPort() })
      break

    case 'tcpserveropen':
      createTCPServer(args.port, args.host)
      break

    case 'tcpserverclose':
      distoryTCPServer()
      break
    case 'tcpclientconnect':
      connectTCPServer(args.port, args.host)
      break
    case 'tcpclientdisconnect':
      disconnectTCPServer()
      break

    default:
      console.log(args)
      break
  }
})

export { rtMsg }
