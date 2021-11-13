const { pipeline } = require('stream')

const parse = require('./parser')
const {
    errorHandler,  
    generateReadStream, 
    generateWriteStream, 
    generateStream 
} = require('./utils')

if (process.argv.length <= 2) {
    process.stderr.write('Run with -c flag followed by cipher pattern. E.g.: -c C1-R0-A')
    process.exit(1)
}

let input, output, pattern
try {
    const parsed = parse(process.argv.slice(2))
    
    if (parsed) {
        input = parsed.input
        output = parsed.output
        pattern = parsed.pattern
    }
} catch (error) {
    errorHandler(error)
}

async function run() {
    const rStream = typeof input === 'undefined' 
        ? process.stdin 
        : await generateReadStream(input)

    const wStream = typeof output === 'undefined'
        ? process.stdout
        : await generateWriteStream(output)

    const tStreams = pattern
        .split('-')
        .map(generateStream)

    pipeline(
        rStream,
        ...tStreams,
        wStream,
        (err) => {
            if (err) console.error('Pipeline failed.', err)
            else console.log('Pipeline succeeded.');
        }
    )
}

run()
    .then((_) => console.log('Successful!'))
    .catch(errorHandler)
