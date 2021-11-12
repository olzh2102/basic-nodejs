const { join } = require('path')
const { pipeline } = require('stream')
const { createWriteStream, createReadStream } = require('fs')

const {createCustomReadStream, createCustomWriteStream} = require('./custom-streams')
const {InvalidCipherPatternError} = require('./custom-errors');
const { 
    CaesarTransform, 
    Rot8Transform,
    AtbashTransform 
} = require('./transformer')
const cipher = require('./cipher')

const parse = require('./parser')
const validate = require('./validation')
const {TR_STREAMS_MAP} = require('./constants')
const {handleError, errorHandler} = require('./utils')

if (process.argv <= 2) {
    process.stderr.write('Run with -c flag followed by cipher pattern. E.g.: -c C1-R0-A')
    process.exit(1)
}

const { input, output, pattern, flags } = parse(process.argv.slice(2))

// validate({ flags, pattern }, (errMessage) => {
//     process.stderr.write(`Invalid pattern: ${errMessage}`)
//     process.exitCode = 1
// })
const rStream = input 
    ? createCustomReadStream(join(__dirname, input))
    : process.stdin

const wStream = output 
    ? createCustomWriteStream(join(__dirname, output), { flags: 'a' })
    : process.stdout

const tStreams = pattern
    .split('-')
    .map(generateStream)

function generateStream(type) {
    const map = {
        'C1': new CaesarTransform(cipher(1)),
        'C0': new CaesarTransform(cipher(-1)),
        'R1': new Rot8Transform(cipher(8)),
        'R0': new Rot8Transform(cipher(-8)),
        'A': new AtbashTransform(cipher('atb'))
    }

    try { 
        if (!(type in map)) 
            throw new InvalidCipherPatternError('Pattern is incorrect!')
        
        return map[type]
    } catch (e) { 
        errorHandler(e) 
    } 
}

pipeline(
    rStream,
    ...tStreams,
    wStream,
    handleError
)
