import dgram from 'dgram'
import { rtMsg } from '../ipc'
let server
let client
const controller = new AbortController()
const { signal } = controller

function createUDPServer(port, host, multicast) {
  console.log(multicast)
  server = dgram.createSocket('udp4', signal)
  let address
  server.on('listening', () => {
    if (multicast) {
      server.setBroadcast(true)
      server.setMulticastTTL(128)
      server.addMembership(host)
    }
    address = server.address()
    rtMsg({
      command: 'msg',
      protocol: 'UDP Server',
      message: `UDP Server Open ${address.address}:${address.port}`
    })
  })

  server.on('message', (message, remote) => {
    console.log(message)
    rtMsg({
      command: 'msg',
      protocol: 'UDP Server',
      from: `${remote.address}:${remote.port}`,
      message: message.toString()
    })
  })
  if (multicast) {
    server.bind(port, '0.0.0.0')
  } else {
    server.bind(port, host)
  }
}

function distoryUDPServer() {
  server.close()
  controller.abort()
  rtMsg({
    command: 'msg',
    protocol: 'UDP Server',
    message: 'UDP Server Closed'
  })
}

export { createUDPServer, distoryUDPServer }
