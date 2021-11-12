class InvalidCipherPatternError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'InvalidCipherPatternError'
        this.isCustom = true
    }
}

class RepeatedArgumentError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'RepeatedArgumentError'
        this.isCustom = true
    }
}

module.exports = {
    InvalidCipherPatternError,
    RepeatedArgumentError,
}