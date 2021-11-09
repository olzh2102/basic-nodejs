const { ALLOWED_FLAGS } = require('./constants')

function parse(args) {
    if (args.length <= 2)
        throw new Error('run with -c flag followed by cipher pattern. E.g.: -c C1-R0-A')

    let cFlagIndex = args.findIndex((o) => o == '-c'),
        iFlagIndex = args.findIndex((o) => o == '-i'),
        oFlagIndex = args.findIndex((o) => o == '-o')

    return {
        pattern: getVal(cFlagIndex, args),
        input: getVal(iFlagIndex, args),
        output: getVal(oFlagIndex, args)
    }
}

module.exports = parse

function getVal(flagIndex, args) {
    if (flagIndex == -1) return;
    return args[flagIndex + 1]
}