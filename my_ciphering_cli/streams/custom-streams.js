const fs = require('fs')
const {Readable, Writable} = require('stream')

class CustomReadableStream extends Readable {
    constructor(filename) {
        super()
        this.filename = filename
        this.fd = null
    }

    _construct(cb) {
        fs.open(
            this.filename, 
            (err, fd) => {
                if (err) cb(err);
                else { 
                    this.fd = fd;
                    cb();
                }
            }
        );
    }

    _read(resource) {
        const buffer = Buffer.alloc(resource)

        fs.read(
            this.fd,
            buffer,
            0,
            resource,
            null,
            (_, bytesRead) => {
                this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null)
            }
        )
    }
}

class CustomWritableStream extends Writable {
    constructor(filename, options) {
        super(filename)
        this.filename = filename
        this.appendFlag = options.flags
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
        fs.write(this.fd, chunk, cb)
    }
}

const createCustomWriteStream = (filename, options) => new CustomWritableStream(filename, options) 
const createCustomReadStream = (filename) => new CustomReadableStream(filename)

module.exports = {
    createCustomWriteStream,
    createCustomReadStream
}