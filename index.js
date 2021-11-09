const { join } = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { pipeline } = require('stream')

const parse = require('./parser');
const { CaesarTransform, Rot8Transform, AtbashTransform } = require('./transformer')

const args = process.argv.slice(2)
const { input, output, pattern } = parse(args)

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
    (err) => {
        if (err) 
            console.error('Pipeline failed.', err);
        else 
            console.log('Pipeline succeeded.');
    }
)

// * ============================
function generateStream(cipher) {
    return {
        'C1': new CaesarTransform('C1'),
        'C0': new CaesarTransform('C0'),
        'R1': new Rot8Transform('R1'),
        'R0': new Rot8Transform('R0'),
        'A': new AtbashTransform('A')
    }[cipher]
}
