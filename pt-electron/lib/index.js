const path = require('path')

const { app, BrowserWindow, ipcMain } = require('electron')

const { PositronContext } = require('ptlib-nodejs')

app.on('ready', () => {
  const ptCtx = new PositronContext()

  ipcMain.on('pt-msg', (evt, data) => {
    data = JSON.parse(data)
    switch (data.method) {
      case 'peek':
        break
      case 'incr':
        ptCtx.incr()
        break
      default:
        evt.sender.send('pt-msg', JSON.stringify({
          error: 'unexpected method name: "' + data.method + '"'
        }))
        return
    }
    evt.sender.send('pt-msg', JSON.stringify({
      response: { state: ptCtx.peek() }
    }))
  })

  const w = new BrowserWindow({width: 800, height: 600})
  w.loadFile(path.join('..', 'web-ui', 'index.html'))
})
