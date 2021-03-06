class InvalidCipherPatternError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'InvalidCipherPatternError'
        this.isCustom = true
    }
}

class NoValueFoundAfterFlagError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'NoValueFoundAfterFlagError'
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

class NoSuchFileError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'NoSuchFileError'
        this.isCustom = true
    }
}

class NoConfigArgumentProvidedError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'NoConfigArgumentProvidedError'
        this.isCustom = true
    }
}

module.exports = {
    InvalidCipherPatternError,
    NoValueFoundAfterFlagError,
    RepeatedArgumentError,
    NoSuchFileError,
    NoConfigArgumentProvidedError
}