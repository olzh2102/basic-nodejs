const { Transform } = require('stream');

const cipher = require('./cipher')

const map = {
    'C1': cipher(1),
    'C0': cipher(-1),
    'R0': cipher(-8),
    'R1': cipher(8),
    'A': cipher('atb')
}
class CaesarTransform extends Transform {
    constructor(type) {
        super()
        this.type = type
    }

    _transform(chunk, _, cb) {
        let res = String(chunk)
        res = map[this.type](res)

        this.push(res)
        cb()
    }
}

class Rot8Transform extends Transform {
    constructor(cipherType) { 
        super() 
        this.cipherType = cipherType
    }

    _transform(chunk, _, cb) {
        let res = String(chunk)
        res = map[this.cipherType](res)
        
        this.push(res)
        cb()
    }
}

class AtbashTransform extends Transform {
    constructor(cipherType) { 
        super() 
        this.cipherType = cipherType
    }

    _transform(chunk, _, cb) {
        let res = String(chunk)
        res = map[this.cipherType](res)
        
        this.push(res)
        cb()
    }
}

module.exports = {
    CaesarTransform,
    Rot8Transform,
    AtbashTransform
}