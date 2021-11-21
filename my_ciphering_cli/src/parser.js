const { sanitize } = require('./utils')
const {
    RepeatedArgumentError, 
    NoValueFoundAfterFlagError, 
    NoConfigArgumentProvidedError
} = require('./custom-errors')

function parse(args) {
    if (args.length == 2)
        throw new NoValueFoundAfterFlagError('Run with -c flag followed by cipher pattern. E.g.: -c C1-R0-A')
    
    args = args.slice(2)

    if (args.length != new Set(args).size)
        throw new RepeatedArgumentError('Some arguments are repeated, please check!')

    const sanitizedArgs = args.map(sanitize)

    if (sanitizedArgs.filter((arg) => arg == '-c').length == 0)
        throw new NoConfigArgumentProvidedError('Could not find config flag to match the pattern!')

    let map = {}
    for (let i = 0; i < sanitizedArgs.length; i++)
        if (sanitizedArgs[i] in map)
            throw new RepeatedArgumentError(`${sanitizedArgs[i]} is repeated, please check!`)
        else map[sanitizedArgs[i]] = i 
    
    let cFlagIndex = map['-c'],
        iFlagIndex = map['-i'],
        oFlagIndex = map['-o']

    if (
        cFlagIndex == sanitizedArgs.length - 1 ||
        iFlagIndex == sanitizedArgs.length - 1 ||
        oFlagIndex == sanitizedArgs.length - 1
     ) throw new NoValueFoundAfterFlagError('No value provided after the flag!')

    return {
        pattern: sanitizedArgs[cFlagIndex + 1],
        input: sanitizedArgs[iFlagIndex + 1],
        output: sanitizedArgs[oFlagIndex + 1],
    }
}

module.exports = parse

