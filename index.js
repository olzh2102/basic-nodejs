const { join } = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { pipeline } = require('stream')

const parse = require('./parser')
const cipher = require('./cipher')
const { CaesarTransform, Rot8Transform, AtbashTransform } = require('./transformer')

const { input, output, pattern } = parse(process.argv)

const rStream = input 
    ? createReadStream(join(__dirname, input), 'utf8') 
    : process.stdin

const wStream = output 
    ? createWriteStream(join(__dirname, output))
    : process.stdout

const tStreams = pattern.split('-').map(generateStream)

pipeline(
    rStream,
    ...tStreams,
    wStream,
    handleError
)

// * ============================
function generateStream(type) {
    return {
        'C1': new CaesarTransform(cipher(1)),
        'C0': new CaesarTransform(cipher(-1)),
        'R1': new Rot8Transform(cipher(8)),
        'R0': new Rot8Transform(cipher(-8)),
        'A': new AtbashTransform(cipher('atb'))
    }[type]
}

function handleError(error) {
    if (error)
        console.error('Pipeline failed.', error)
    else
        console.log('Pipeline succeeded.');
}
