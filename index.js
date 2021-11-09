const { join } = require('path')
const { createReadStream, createWriteStream } = require('fs')

const CustomTransformStream = require('./transformer')
const parse = require('./parser');

const args = process.argv.slice(2)
const { input, output, pattern } = parse(args)

const rStream = input 
    ? createReadStream(join(__dirname, input), 'utf8') 
    : process.stdin

const wStream = output 
    ? createWriteStream(join(__dirname, output))
    : process.stdout

const tStream = new CustomTransformStream(pattern)

rStream
    .pipe(tStream)
    .pipe(wStream)
