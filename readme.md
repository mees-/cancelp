# cancelp
| a cancelable promise


### usage
```js
import cancelp from 'cancelp'

const promise = cancelp((resolve, reject) => {
  setTimeout(
    () => resolve('Hello'),
    100
  )
})

promise.catch(e => {
  console.log(e)
  // => 'hello, you are stopped now'
})

promise.then(() => {
  // this never runs
})

promise.cancel('Hello, you are stopped now')
```

Instead of calling `cancel` you can also call `cancelReject` or `cancelResolve`.
These act like you would expect, resolving/rejecting the values you pass to them
immediately
