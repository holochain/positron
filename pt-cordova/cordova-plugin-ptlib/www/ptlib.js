const channel = require('cordova/channel');
const exec = require('cordova/exec');
const cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
channel.waitForInitialization('onCordovaInfoReady');

exports.state = 'loading...'

exports.call = (method, ...args) => {
  args.unshift(method)
  return new Promise((resolve, reject) => {
    exec((data) => {
      resolve(data)
    }, (err) => {
      reject(err)
    }, 'PTLib', 'call', args)
  })
}

exports.onReady = new Promise((resolve, reject) => {
  channel.onCordovaReady.subscribe(async () => {
    try {
      exports.state = (await exports.call({
        method: 'initialize'
      }))[0]
      resolve(exports)
    } catch (e) {
      exports.state = e.stack || e.toString()
      reject(e)
    }
    document.dispatchEvent(new Event('ptlibready'))
  })
})
