import { BrowserWindow, ipcMain } from 'electron'
import {
  getPort,
  serialPortOpen,
  serialPortClose,
  serialPortSend
} from '../serial'
import {
  createTCPServer,
  distoryTCPServer,
  connectTCPServer,
  disconnectTCPServer,
  TCPWrite
} from '../tcp'

import {
  createUDPServer,
  distoryUDPServer,
  createUDPSender,
  closeUDPSender,
  UDPSenderSend
} from '../udp'

function rtMsg(args) {
  BrowserWindow.fromId(1).webContents.send('onResponse', args)
}

ipcMain.on('onRequest', async (e, args) => {
  switch (args.command) {
    case 'start':
      rtMsg({ command: 'serialports', list: await getPort() })
      break
    case 'serialport':
      rtMsg({ command: 'serialports', list: await getPort() })
      break
    case 'serialportopen':
      serialPortOpen(args.serial)
      break
    case 'serialportclose':
      serialPortClose()
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
    case 'udpsenderopen':
      console.log('sender open')
      createUDPSender(args.port, args.host, args.multicast)
      break
    case 'udpsenderclose':
      closeUDPSender()
      break
    case 'send':
      let message = args.message
      if (args.sendLF) {
        message += '\r\n'
      }
      console.log(message)
      if (args.sendHex) {
        let buffer = Buffer.from(message, 'hex')
        if (args.sendLF) {
          let CRLF = Buffer.from([0x0d, 0x0a])
          buffer = Buffer.concat([buffer, CRLF])
        }
        TCPWrite(buffer)
        UDPSenderSend(buffer)
        serialPortSend(buffer)
      } else {
        TCPWrite(message)
        UDPSenderSend(message)
        serialPortSend(message)
      }

      break
    default:
      console.log(args)
      break
  }
})

export { rtMsg }
