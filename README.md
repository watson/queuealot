# queuealot

Bike shed queing module using closures for augmenting each result. All
jobs are run in series one at a time.

There are many, many other queueing modules out there, so why queuealot?
Queuealot gives you the freedom to work with and augment each result
from each job on the queue as they come in (see more below).

[![Build status](https://travis-ci.org/watson/queuealot.svg?branch=master)](https://travis-ci.org/watson/queuealot)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install queuealot
```

## Usage

```js
var Queue = require('queuealot')

// initialize a new queue
var queue = Queue(function (err, results) {
  if (err) throw err
  console.log(results) // => ['foo']
})

// add a job to the queue
queue(function (callback) {
  // do your stuff here and call the callback when done with an optional
  // error and the result
  callback(null, 'bar')
})
```

**Gotcha: Add all the jobs to the queue before the next tick.** The
queue expects that all jobs are added to the queue within the same tick
as the queue was initialized. On the next tick the queue will run,
execute all jobs on the queue and call the final function given when
initialized.

## Why?

Ok the above example isn't really that useful. Let's instead say you are
reading a bunch of files and want to know the filename that generated
each result:

```js
var Queue = require('queuealot')
var fs = require('fs')

var queue = Queue(function (err, files) {
  if (err) throw err
  files.forEach(function (file) {
    console.log(file.path)
    console.log(file.body)
  })
})

queue(function (callback) {
  var path = '/path/to/file.txt'
  fs.readFile(path, function (err, data) {
    if (err) return callback(err)
    callback(null, { path: path, body: data })
  })
})

queue(function (callback) {
  var path = '/path/to/other/file.txt'
  fs.readFile(path, function (err, data) {
    if (err) return callback(err)
    callback(null, { path: path, body: data })
  })
})
```

## License

MIT
