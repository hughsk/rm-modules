#!/usr/bin/env node

require('./')(process.cwd(), function(err) {
  if (err) throw err
})
