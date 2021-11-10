const { ALLOWED_FLAGS } = require('./constants')

function parse(args) {
    if (args.length <= 2) {
        process.stderr.write('Run with -c flag followed by cipher pattern. E.g.: -c C1-R0-A')
        process.exit(-1)
    }

    args = process.argv.slice(2)

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