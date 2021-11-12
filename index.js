const { join } = require('path')
const { pipeline } = require('stream')

const { CaesarTransform, Rot8Transform, AtbashTransform } = require('./transformer')
const createCustomReadStream = require('./readable-stream')
const createCustomWriteStream = require('./writable-stream')
const InvalidCipherPatternError = require('./custom-errors');

const parse = require('./parser')
const cipher = require('./cipher')
const validate = require('./validation')
const { handleError, errorHandler } = require('./utils')

const { input, output, pattern, flags } = parse(process.argv)
// validate({ flags, pattern }, (errMessage) => {
//     process.stderr.write(`Invalid pattern: ${errMessage}`)
//     process.exit(1)
// })
const rStream = input 
    ? createCustomReadStream(join(__dirname, input))
    : process.stdin

const wStream = output 
    ? createCustomWriteStream(join(__dirname, output))
    : process.stdout

const tStreams = pattern
    .split('-')
    .map((type) => {
        try { generateStream(type) } 
        catch(e) { errorHandler(e) }
    })

function generateStream(type) {
    const map = {
        'C1': new CaesarTransform(cipher(1)),
        'C0': new CaesarTransform(cipher(-1)),
        'R1': new Rot8Transform(cipher(8)),
        'R0': new Rot8Transform(cipher(-8)),
        'A': new AtbashTransform(cipher('atb'))
    }

    if (!(type in map)) throw new InvalidCipherPatternError('Pattern is incorrect!')
    
    return map[type]
}

pipeline(
    rStream,
    ...tStreams,
    wStream,
    handleError
)
