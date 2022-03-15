import { BrowserWindow } from 'electron'
import { rtMsg } from '../ipc'
import net from 'net'
import { createSocket } from 'dgram'

let server
let client
const clients = []

function createTCPServer(port, host) {
  try {
    server = net.createServer((socket) => {
      //
    })

    server.on('error', async (err) => {
      console.error('tcp server error: ', err)
      await closeServer()
      rtMsg({ command: 'tcperror' })
      rtMsg({
        time: Date.now(),
        command: 'msg',
        protocol: 'TCP Server',
        message: `TCP Server Error: ${err}`
      })
    })

    server.on('connection', (socket) => {
      clients.push(socket)
      const address = `${socket.remoteAddress}:${socket.remotePort}`
      rtMsg({
        command: 'msg',
        time: Date.now(),
        protocol: 'TCP Server',
        from: address,
        message: `Client Connected ${address}`
      })

      socket.on('close', () => {
        clients.splice(clients.indexOf(socket), 1)
        rtMsg({
          command: 'msg',
          time: Date.now(),
          protocol: 'TCP Server',
          from: address,
          message: `Client Disconnected ${address}`
        })
      })

      socket.on('data', (data) => {
        rtMsg({
          time: Date.now(),
          command: 'msg',
          protocol: 'TCP Server',
          from: address,
          message: data.toString()
        })
      })
    })

    server.listen(port, host, () => {
      console.log(`tcp server start ${host}:${port}`)
      rtMsg({
        time: Date.now(),
        command: 'msg',
        protocol: 'TCP Server',
        message: `TCP Server Open ${host}:${port}`
      })
    })
  } catch (e) {
    console.error(e)
  }
}

async function distoryTCPServer() {
  await closeServer()
  rtMsg({
    time: Date.now(),
    command: 'msg',
    protocol: 'TCP Server',
    message: 'TCP Server Closed'
  })
}

function closeServer() {
  return new Promise((resolve, reject) => {
    try {
      for (let i in clients) {
        clients[i].destroy()
      }
      server.close()
      server = null
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

function connectTCPServer(port, host) {
  client = net.connect({ port: port, host: host })
  client.on('connect', () => {
    console.log('tcp client connected')
    const address = `${host}:${port}`
    rtMsg({
      command: 'msg',
      time: Date.now(),
      protocol: 'TCP Client',
      message: `TCP Client Connected ${host}:${port}`
    })

    client.on('close', () => {
      rtMsg({ command: 'tcpclose' })
      rtMsg({
        command: 'msg',
        time: Date.now(),
        protocol: 'TCP Client',
        from: address,
        message: 'TCP Client Closed by Remote'
      })
    })

    client.on('error', (err) => {
      rtMsg({ command: 'tcperror' })
      rtMsg({
        command: 'msg',
        time: Date.now(),
        protocol: 'TCP Client',
        from: address,
        message: `TCP Client Error: ${err}`
      })
    })

    client.on('data', (data) => {
      rtMsg({
        command: 'msg',
        time: Date.now(),
        protocol: 'TCP Client',
        from: address,
        message: data.toString()
      })
    })
  })
}

function disconnectTCPServer() {
  client.destroy()
}

export {
  createTCPServer,
  distoryTCPServer,
  connectTCPServer,
  disconnectTCPServer
}
