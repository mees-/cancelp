const test = require('ava')
const cancelp = require('./index')

test('can be canceled', async t => {
  const promise = cancelp(resolve => {
    setTimeout(() => resolve('hello, world'), 100)
  })
  promise.then(() => {
    // this should never run
    t.fail('then handler was called after cancel')
  })
  .catch(e => {
    // do nothing
  })
  promise.cancel(new Error('test error'))
  await t.throws(promise)
})

test('rejects error from cancel', async t => {
  const promise = cancelp(resolve => {
    setTimeout(() => resolve('hello, world'), 100)
  })
  promise.cancel(new Error('test error'))
  await t.throws(promise, 'test error')
})

test('can be used with new', t => {
  t.notThrows(() => {
    const promise = new cancelp(resolve => {
      resolve('hello')
    })
  })
})
