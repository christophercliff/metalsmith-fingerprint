var crypto = require('crypto')
var multimatch = require('multimatch')
var path = require('path')

var KEY = 'metalsmith'

module.exports = plugin

function plugin(options) {
    return function (files, metalsmith, done) {
        var metadata = metalsmith.metadata()
        metadata.fingerprint =  (metadata.fingerprint || {})
        Object.keys(files)
            .filter(function (p) {
                return multimatch(p, options.pattern).length > 0
            })
            .forEach(function (p) {
                unixp = p.replace(/\\/g, '/')
                var hash = crypto.createHmac('md5', KEY).update(files[p].contents).digest('hex')
                var ext = path.extname(p)
                var fingerprint =  [unixp.substring(0, unixp.lastIndexOf(ext)), '-', hash, ext].join('')
                files[fingerprint] = files[p]
                metadata.fingerprint[unixp] = fingerprint
            })
        return process.nextTick(done)
    }
}
