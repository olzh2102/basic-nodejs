const { pipeline } = require('stream')

const parse = require('./src/parser')
const {
    errorHandler,  
    generateReadStream, 
    generateWriteStream,
    generateStream,
    consoleReadStream,
    pipelineErrorCb 
} = require('./src/utils')

async function run() {
    let { input, output, pattern } = parse(process.argv)

    const rStream = input
        ? await generateReadStream(input)
        : consoleReadStream()

    const wStream = output
        ? await generateWriteStream(output)
        : process.stdout

    const tStreams = pattern
        .split('-')
        .map(generateStream)
    
    pipeline(
        rStream,
        ...tStreams,
        wStream,
        pipelineErrorCb 
    )
}

run().catch(errorHandler)
