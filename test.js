'use strict'

var test = require('tape')
var queuealot = require('./')

test('no jobs', function (t) {
  var called = false
  queuealot(function () {
    called = true
  })
  setTimeout(function () {
    t.equal(called, true)
    t.end()
  }, 50)
})

test('2 jobs', function (t) {
  var queue = queuealot(function (err, results) {
    t.error(err)
    t.deepEqual(results, ['r12foo', 'r34foo'])
    t.end()
  })
  var fn = function (a, b, cb) {
    cb(null, 'r' + a + b)
  }
  queue(function (cb) {
    fn(1, 2, function (err, result) {
      t.error(err)
      t.equal(result, 'r12')
      result += 'foo'
      cb(err, result)
    })
  })
  queue(function (cb) {
    fn(3, 4, function (err, result) {
      t.error(err)
      t.equal(result, 'r34')
      result += 'foo'
      cb(err, result)
    })
  })
})

test('error', function (t) {
  var calls = 0
  var queue = queuealot(function (err, results) {
    t.equal(err, 'error')
    t.equal(calls, 2)
    t.deepEqual(results, ['r12foo', 'r34'])
    t.end()
  })
  var fn1 = function (a, b, cb) {
    calls++
    cb('error', 'r' + a + b)
  }
  var fn2 = function (a, b, cb) {
    calls++
    cb(null, 'r' + a + b)
  }
  queue(function (cb) {
    fn1(1, 2, function (err, result) {
      t.equal(err, 'error')
      t.equal(result, 'r12')
      result += 'foo'
      cb(err, result)
    })
  })
  queue(fn2.bind(null, 3, 4))
})
