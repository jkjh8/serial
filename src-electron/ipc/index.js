import { BrowserWindow, ipcMain } from 'electron'
import { getPort } from '../serial'

function rt(args) {
  BrowserWindow.fromId(1).webContents.send('onResponse', args)
}

ipcMain.on('onRequest', async (e, args) => {
  console.log(args)
  switch (args.command) {
    case 'start':
      rt({ command: 'serialports', list: await getPort() })
      break
  }
})
