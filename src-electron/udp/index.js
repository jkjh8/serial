import dgram from 'dgram'
import { rtMsg } from '../ipc'
let server
let client
let senderAddress
const controller = new AbortController()
const { signal } = controller

function createUDPServer(port, host, multicast) {
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
    rtMsg({
      command: 'msg',
      protocol: 'UDP Server',
      from: `${remote.address}:${remote.port}`,
      message: message,
      type: 'byte'
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

function createUDPSender(port, host, multicast) {
  senderAddress = { port: port, host: host }
  client = dgram.createSocket('udp4')
  client.bind()
  if (multicast) {
    client.setBroadcast(true)
    client.setMulticastTTL(128)
    client.addMembership(host)
  }
  rtMsg({ command: 'msg', protocol: 'UDP Sender', message: 'UDP Sender Ready' })
}

function closeUDPSender() {
  client.close()
  client = null
}

function UDPSenderSend(data) {
  if (client) {
    client.send(data, 0, data.length, senderAddress.port, senderAddress.host)
    rtMsg({
      command: 'msg',
      protocol: 'UDP Sender',
      from: 'Send',
      message: data
    })
  }
}
export {
  createUDPServer,
  distoryUDPServer,
  createUDPSender,
  closeUDPSender,
  UDPSenderSend
}
