const fs = require('fs')
const { Writable } = require('stream')

class CustomWritableStream extends Writable {
    constructor(filename) {
        super(filename)
        this.filename = filename
        this.appendFlag = 'a'
    }

    _construct(cb) {
        fs.open(
            this.filename,
            this.appendFlag,
            (_, fd) => {
                this.fd = fd
                cb()
            }
        )
    } 

    _write(chunk, _, cb) {
        console.log('chunk: ', chunk.toString())
        fs.write(this.fd, chunk, cb)
    }
}

module.exports = (filename) => new CustomWritableStream(filename)