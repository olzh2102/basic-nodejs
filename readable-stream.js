const fs = require('fs')
const { Readable } = require('stream')

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
            (_, bytesRead) => this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null)
        )
    }
}

module.exports = (filename) => new CustomReadableStream(filename)