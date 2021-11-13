const { pipeline } = require('stream')
const parse = require('./parser')
const {
    errorHandler, 
    handleError, 
    generateReadStream, 
    generateWriteStream, 
    generateStream 
} = require('./utils')

if (process.argv.length <= 2) {
    process.stderr.write('Run with -c flag followed by cipher pattern. E.g.: -c C1-R0-A')
    process.exit(1)
}

let { input, output, pattern, flags } = parse(process.argv.slice(2))

async function run() {
    const rStream = typeof input === 'undefined' 
        ? process.stdin 
        : await generateReadStream(input)

    const wStream = typeof output === 'undefined'
        ? generateWriteStream(input)
        : process.stdout

    const tStreams = pattern
        .split('-')
        .map(generateStream)

    pipeline(
        rStream,
        ...tStreams,
        wStream,
        handleError
    )
}

run()
    .then((_) => console.log('Successful!'))
    .catch(errorHandler)

