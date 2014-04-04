var crypto = require('crypto')
var multimatch = require('multimatch')
var path = require('path')

var KEY = 'metalsmith'

module.exports = plugin

function plugin(options) {
    return function (files, metalsmith, done) {
        metalsmith.data.fingerprint = {}
        Object.keys(files)
            .filter(function(p){
                return multimatch(p, options.pattern).length > 0
            })
            .forEach(function(p){
                var hash = crypto.createHmac('md5', KEY).update(files[p].contents).digest('hex')
                var ext = path.extname(p)
                var fingerprint =  [p.substring(0, p.lastIndexOf(ext)), '-', hash, ext].join('')
                files[fingerprint] = files[p]
                metalsmith.data.fingerprint[p] = fingerprint
            })
        return process.nextTick(done)
    }
}
