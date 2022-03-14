import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  onRequest: (args) => {
    ipcRenderer.send('onRequest', { ...args })
  },
  onResponse: (fn) => {
    ipcRenderer.on('onResponse', (event, ...args) => {
      fn(...args)
    })
  }
})
