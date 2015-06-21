'use strict'

var mutexify = require('mutexify')
var afterAll = require('after-all-results')

module.exports = function (done) {
  var lock = mutexify()
  var next = afterAll(done)

  return function (fn) {
    var cb = next()
    lock(function (release) {
      fn(release.bind(null, cb))
    })
  }
}
