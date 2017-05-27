const assert = require('assert')
const cancelp = require('./index')

const promiseOne = cancelp((resolve, reject) => {
  setTimeout(() => resolve('hello, world'), 100)
})

promiseOne.then(() => {
  // this should never run
  throw new Error('Test failed, promise was resolved')
}).catch(e => {
  assert(e === 'this is a test')
  console.log('1')
})


promiseOne.cancel('this is a test')

const promiseTwo = cancelp((resolve, reject) => {
  setTimeout(() => resolve('hello, world'), 100)
})

promiseTwo.then(msg => {
  assert(msg === 'hello, world')
  console.log('2')
})
