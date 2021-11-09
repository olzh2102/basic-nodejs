const { Transform } = require('stream');

const cipher = require('./cipher')

const map = {
    'C1': cipher(1),
    'C0': cipher(-1),
    'R0': cipher(-8),
    'R1': cipher(8),
    'A': cipher('atb')
}

class CustomTransform extends Transform {
    constructor(pattern) {
        super()
        this.pattern = pattern
    }

    _transform(chunk, _, cb) {
        let res = String(chunk)

        for (let cipher of this.pattern.split('-')) 
            res = map[cipher](res)
        
        this.push(res)
        cb()
    }
}

module.exports = CustomTransform