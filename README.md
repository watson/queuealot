# queuealot

Bike shed queueing module

## Installation

```
npm install queuealot
```

## Usage

```js
var Queue = require('queuealot')

var queue = Queue(function (err, results) {
  if (err) throw err
  console.log(results) // ['foo', 'bar']
})

queue(function (cb) {
  cb(null, 'foo')
})

queue(function (cb) {
  cb(null, 'bar')
})
```

## License

MIT
