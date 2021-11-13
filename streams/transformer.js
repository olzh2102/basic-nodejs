const { Transform } = require('stream');
class CaesarTransform extends Transform {
    constructor(transformerFn) {
        super()
        this.transformerFn = transformerFn
    }

    _transform(chunk, _, cb) {
        let text = this.transformerFn(String(chunk))
        this.push(text)
        cb()
    }
}

class Rot8Transform extends Transform {
    constructor(transformerFn) { 
        super() 
        this.transformerFn = transformerFn
    }

    _transform(chunk, _, cb) {
        let text = this.transformerFn(String(chunk))
        this.push(text)
        cb()
    }
}

class AtbashTransform extends Transform {
    constructor(transformerFn) { 
        super() 
        this.transformerFn = transformerFn
    }

    _transform(chunk, _, cb) {
        let text = this.transformerFn(String(chunk))
        this.push(text)
        cb()
    }
}

module.exports = {
    CaesarTransform,
    Rot8Transform,
    AtbashTransform
}