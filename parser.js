const {ALLOWED_FLAGS} = require('./constants')
const {RepeatedArgumentError} = require('./custom-errors')
const {errorHandler} = require('./utils')

function parse(args) {
    const cFlags = args.filter((arg) => arg == '-c' || arg == '--config')

    try {
        if (cFlags.length >= 2) throw new RepeatedArgumentError('Config flag is repeated more than once!')
    } catch (e) {
        errorHandler(e)
    }

    // if (
    //     args.filter((flag) => flag == '-c').length >= 2 ||
    //     args.filter((flag) => flag == '--config').length >= 2
    // ) {
    //     process.stderr.write('Config flag appeared more than once. Please run with one "-c" or "--config"')
    //     process.exit(-1)
    // }

    let flags = args.filter((val) => ALLOWED_FLAGS.includes(val))

    let cFlagIndex = args.findIndex((o) => o == '-c' || o == '--config'),
        iFlagIndex = args.findIndex((o) => o == '-i'),
        oFlagIndex = args.findIndex((o) => o == '-o')

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
    return args[flagIndex + 1]
}