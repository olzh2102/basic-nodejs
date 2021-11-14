const {join} = require('path')
const {access, constants} = require('fs')

const {NoSuchFileError, InvalidCipherPatternError} = require('./custom-errors')
const {createCustomReadStream, createCustomWriteStream} = require('./streams/custom-streams')
const cipher = require('./cipher')
const { 
    CaesarTransform, 
    Rot8Transform,
    AtbashTransform 
} = require('./streams/transformer')

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

function generateStream(type) {
    if (type.startsWith('A') && type.length > 1)
        throw new InvalidCipherPatternError('Atbash type cannot have any leading number or letter!')

    const map = {
        'C1': new CaesarTransform(cipher(1)),
        'C0': new CaesarTransform(cipher(-1)),
        'R1': new Rot8Transform(cipher(8)),
        'R0': new Rot8Transform(cipher(-8)),
        'A': new AtbashTransform(cipher('atb'))
    }

    if (!(type in map)) 
        throw new InvalidCipherPatternError('Pattern is incorrect!')

    return map[type]
}

function sanitize(arg) {
    if (arg == '-c' || arg == '--config') return '-c'
    if (arg == '-i' || arg == '--input') return '-i'
    if (arg == '-o' || arg == '--output') return '-o'
    else return arg
}

async function generateReadStream(input) {
    try {
        const isAccessable = await isFileAccessable(join(__dirname, input), 'r')
        if (isAccessable)
            return createCustomReadStream(join(__dirname, input))
    } catch (error) {
        errorHandler(error)
    }
}

async function generateWriteStream(output) {
    try {
        const isAccessable = await isFileAccessable(join(__dirname, output), 'w')
        if (isAccessable)
            return createCustomWriteStream(join(__dirname, output), { flags: 'a' })
    } catch (error) {
        errorHandler(error)
    }
}

module.exports = {
    errorHandler,
    isFileAccessable,
    generateReadStream,
    generateWriteStream,
    generateStream,
    sanitize
}