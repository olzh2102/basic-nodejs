const { access, constants } = require('fs')

const cipher = require('./cipher')
const { NoSuchFileError, InvalidCipherPatternError } = require('./custom-errors')
const { createCustomReadStream, createCustomWriteStream } = require('../streams/custom-streams')

const { 
    CaesarTransform, 
    Rot8Transform,
    AtbashTransform 
} = require('../streams/transformer')

const { 
    CAESAR_SHIFT, 
    ROT8_SHIFT, 
    ATBASH_FLAG, 
    MARKS 
} = require('./constants')

function errorHandler(err) {
    let { isCustom, name, message } = err

    if (isCustom) {
        process.stderr.write(`${name}: ${message}`)
        process.exit(1)
    } else throw err
}

function isFileAccessable(pathToFile, flag) {
    return new Promise((resolve, reject) => {
        access(
            pathToFile, 
            flag == 'r' ? constants.R_OK : constants.W_OK, 
            (err) => {
                if (err) reject(new NoSuchFileError(`Such a file does not exist: ${pathToFile}!`))
                else resolve(true)
            }
            )
        })
}  

function generateStream(mark) {
    if (mark.startsWith('A') && mark.length > 1)
        throw new InvalidCipherPatternError('Atbash type cannot have any leading number or letter!')
    
    const map = {
        [MARKS.A]: new AtbashTransform(cipher(ATBASH_FLAG)),
        [MARKS.C1]: new CaesarTransform(cipher(CAESAR_SHIFT.ENCODE)),
        [MARKS.C0]: new CaesarTransform(cipher(CAESAR_SHIFT.DECODE)),
        [MARKS.R1]: new Rot8Transform(cipher(ROT8_SHIFT.DECODE)),
        [MARKS.R0]: new Rot8Transform(cipher(ROT8_SHIFT.ENCODE))
    }

    if (!(mark in map)) 
        throw new InvalidCipherPatternError('Pattern is incorrect!')

    return map[mark]
}

function sanitize(arg) {
    if (arg == '-c' || arg == '--config') return '-c'
    if (arg == '-i' || arg == '--input') return '-i'
    if (arg == '-o' || arg == '--output') return '-o'
    else return arg
}

async function generateReadStream(input) {
    const isAccessable = await isFileAccessable(input, 'r')
    if (isAccessable) {
        return createCustomReadStream(input)
    }
}

async function generateWriteStream(output) {
    const isAccessable = await isFileAccessable(output, 'w')
    if (isAccessable)
        return createCustomWriteStream(output, { flags: 'a' })
}

function consoleReadStream() {
    process.stdout.write('Please enter your text here: \n')
    process.stdin.resume()
    return process.stdin
}

function pipelineErrorCb(err) {
    if (err) {
        process.stderr.write(err.message);
        process.exit(1);
    }
    
    console.log('Pipeline succeeded.');
}

module.exports = {
    errorHandler,
    isFileAccessable,
    generateReadStream,
    generateWriteStream,
    generateStream,
    sanitize,
    consoleReadStream,
    pipelineErrorCb
}