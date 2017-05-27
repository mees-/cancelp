const EventEmitter = require('events')
// ^ this would have to be stripped out in a browser

module.exports = function(fn, emitter = EventEmitter) {
  // take an optional second emitter parameter for browser environments
  const canceler = new emitter()
  const p = new Promise((resolve, reject) => {
    canceler.on('resolve', resolve)
    canceler.on('reject', reject)
    fn(resolve, reject)
  })

  p.cancelReject = (...args) => canceler.emit('reject', ...args)
  p.cancelResolve = (...args) =>  canceler.emit('resolve', ...args)
  p.cancel = p.cancelReject

  return p
}
