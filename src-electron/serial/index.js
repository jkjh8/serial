import { SerialPort } from 'serialport'
import { rtMsg } from '../ipc'

let port
let com
function getPort() {
  return SerialPort.list()
}

function serialPortOpen(serial) {
  com = serial.path
  port = new SerialPort(serial, (err) => {
    if (err) {
      return rtMsg({
        command: 'msg',
        protocol: 'Serial',
        from: com,
        message: err
      })
    }
    rtMsg({
      command: 'msg',
      protocol: 'Serial',
      from: com,
      message: `Serial Port Open Path: ${com}`
    })
  })

  port.on('error', (err) => {
    rtMsg({ command: 'msg', protocol: 'Serial', from: com, message: err })
  })

  port.on('readable', () => {
    const data = port.read()
    console.log(data)
    rtMsg({
      command: 'msg',
      protocol: 'Serial',
      from: com,
      message: data,
      type: 'byte'
    })
  })
}

function serialPortClose() {
  port.close()
  port = null
  rtMsg({
    command: 'msg',
    protocol: 'Serial',
    from: com,
    message: 'Serial Port Closed'
  })
}

function serialPortSend(data) {
  if (port) {
    port.write(data)
    rtMsg({ command: 'msg', protocol: 'Serial', from: 'Send', message: data })
  }
}

export { getPort, serialPortOpen, serialPortClose, serialPortSend }
