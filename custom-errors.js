class InvalidCipherPatternError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'InvalidCipherPatternError'
        this.isCustom = true
    }
}

module.exports = InvalidCipherPatternError