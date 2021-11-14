const {RepeatedArgumentError, NoValueFoundAfterFlagError} = require('./custom-errors')
const {sanitize} = require('./utils')

function parse(args) {
    if (args.length != new Set(args).size)
        throw new RepeatedArgumentError('Some arguments are repeated, please check!')

    const sanitizedArgs = args.map(sanitize)

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

