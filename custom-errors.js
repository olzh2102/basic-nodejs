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

class NoPermissionError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'NoPermissionError'
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

module.exports = {
    InvalidCipherPatternError,
    RepeatedArgumentError,
    NoPermissionError,
    NoSuchFileError
}