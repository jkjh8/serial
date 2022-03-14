import { SerialPort } from 'serialport'

function getPort() {
  return SerialPort.list()
}

export { getPort }
