import { BrowserWindow, ipcMain } from 'electron'
import { getPort } from '../serial'
import {
  createTCPServer,
  distoryTCPServer,
  connectTCPServer,
  disconnectTCPServer,
  TCPWrite
} from '../tcp'

import { createUDPServer, distoryUDPServer } from '../udp'

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
    case 'udpserveropen':
      createUDPServer(args.port, args.host, args.multicast)
      break
    case 'udpserverclose':
      distoryUDPServer()
      break
    case 'send':
      let message = args.message
      if (args.sendHex) {
        const buffer = Buffer.from(message, 'hex')
        console.log(buffer.length)
        TCPWrite(buffer)
      } else {
        if (args.sendLF) {
          message += '\r\n'
        }
        TCPWrite(message)
      }

      break
    default:
      console.log(args)
      break
  }
})

export { rtMsg }
