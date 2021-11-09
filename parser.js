function parse(args) {
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