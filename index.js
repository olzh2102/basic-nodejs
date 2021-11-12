const { join } = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { pipeline } = require('stream')

const { CaesarTransform, Rot8Transform, AtbashTransform } = require('./transformer')
const createCustomReadStream = require('./readable-stream')
const createCustomWriteStream = require('./writable-stream')

const parse = require('./parser')
const cipher = require('./cipher')
const validate = require('./validation')
const { handleError } = require('./utils')

const { input, output, pattern, flags } = parse(process.argv)
validate({ flags, pattern }, (errMessage) => {
    process.stderr.write(`Invalid pattern: ${errMessage}`)
    process.exit(1)
})
const rStream = input 
    // ? createReadStream(join(__dirname, input), 'utf8') 
    ? createCustomReadStream(join(__dirname, input))
    : process.stdin

const wStream = output 
    ? createCustomWriteStream(join(__dirname, output))
    // ? createWriteStream(join(__dirname, output), { flags: 'a' })
    : process.stdout

const tStreams = pattern
    .split('-')
    .map(generateStream)

function generateStream(type) {
    return {
        'C1': new CaesarTransform(cipher(1)),
        'C0': new CaesarTransform(cipher(-1)),
        'R1': new Rot8Transform(cipher(8)),
        'R0': new Rot8Transform(cipher(-8)),
        'A': new AtbashTransform(cipher('atb'))
    }[type]
}

pipeline(
    rStream,
    ...tStreams,
    wStream,
    handleError
)
