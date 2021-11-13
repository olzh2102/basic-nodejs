const {ALLOWED_FLAGS, ALLOWED_CIPHER_TYPES} = require('./constants')
const {RepeatedArgumentError} = require('./custom-errors')
const {errorHandler} = require('./utils')

function parse(args) {
    const cFlags = args.filter((arg) => arg == '-c' || arg == '--config')

    try {
        if (cFlags.length >= 2) 
            throw new RepeatedArgumentError('Config flag is repeated more than once!')
    } catch (e) {
        errorHandler(e)
    }

    let p = getVal(args.findIndex((o) => o == '-c' || o == '--config'), args)

    let flags = args.filter((val) => ALLOWED_FLAGS.includes(val))

    let cFlagIndex = args.findIndex((o) => o == '-c' || o == '--config'),
        iFlagIndex = args.findIndex((o) => o == '-i' || o == '--input'),
        oFlagIndex = args.findIndex((o) => o == '-o' || o == '--output')

    return {
        pattern: getVal(cFlagIndex, args),
        input: getVal(iFlagIndex, args),
        output: getVal(oFlagIndex, args),
        flags
    }
}

module.exports = parse

function getVal(flagIndex, args) {
    if (flagIndex == -1) return;

    try {
        if (isDuplicated(args[flagIndex], args))
            throw new RepeatedArgumentError('Flag is repeated more than once!')
    } catch (error) {
        errorHandler(error)
    }

    return args[flagIndex + 1]
}

function isDuplicated(flag, args) {
    return args.filter((a) => a == flag).length > 1
}