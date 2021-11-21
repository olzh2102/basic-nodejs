const { pipeline } = require('stream')

const parse = require('./parser')
const {
    errorHandler,  
    generateReadStream, 
    generateWriteStream, 
    generateStream 
} = require('./utils')

async function run() {
    let { input, output, pattern } = parse(process.argv)

    const rStream = input
        ? await generateReadStream(input)
        : process.stdin 

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
        (err) => {
            if (err) {
                process.stderr.write(err.message);
                process.exit(1);
            }
            
            console.log('Pipeline succeeded.');
        }
    )
}

run().catch(errorHandler)
