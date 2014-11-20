var map      = require('map-limit')
var readdirp = require('readdirp')
var rimraf   = require('rimraf')
var fs       = require('fs')

module.exports = remove

function remove(root, done) {
  var dirs = []

  readdirp({
      root: root
    , entryType: 'directories'
  }).on('data', function(dir) {
    dirs.push(dir.fullPath)
  }).once('end', function() {
    map(dirs, 1, function(dirname, next) {
      fs.exists(dirname, function(exists) {
        if (!exists) return next()

        rimraf(dirname, next)
      })
    }, function(err) {
      done(err)
    })
  })
}
