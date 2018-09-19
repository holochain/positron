const browser = require('cordova/platform');

let _state = 0

module.exports = {
  call: (success, error, args) => {
    setTimeout(() => {
      switch (args[0].method) {
        case 'initialize':
          success('ready')
          break
        case 'peek':
          success({ response: { state: _state } })
          break
        case 'incr':
          success({ response: { state: ++_state } })
          break
        default:
          error(new Error('unexpected method name "' + args[0] + '"'))
          break
      }
    }, 0)
  }
}

require('cordova/exec/proxy').add('PTLib', module.exports);
