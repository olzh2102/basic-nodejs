const { accessSync, access, constants } = require('fs')
const { NoSuchFileError } = require('./custom-errors')
const {createCustomReadStream, createCustomWriteStream} = require('./custom-streams')
const { join } = require('path')
const cipher = require('./cipher')

const { 
    CaesarTransform, 
    Rot8Transform,
    AtbashTransform 
} = require('./transformer')

function handleError(error) {
    if (error)
        console.error('Pipeline failed.', error)
    else
        console.log('Pipeline succeeded.');
}

function errorHandler(err) {
    let { isCustom, name, message } = err

    if (isCustom) {
        process.stderr.write(`${name}: ${message}`)
        process.exit(1)
    } else throw err
}

function isFileAccessable(pathToFile, flag) {
    console.log('pathToFile: ' + pathToFile)
    return new Promise((resolve, reject) => {
        access(
            pathToFile, 
            flag == 'r' ? constants.R_OK : constants.W_OK, 
            (err) => {
                if (err)
                    reject(new NoSuchFileError(`Such a file does not exists!`))
                else
                    resolve(true)
            }
        )
    })
}

async function generateReadStream(input) {
    try {
        const isAccessable = await isFileAccessable(input, 'r')
        if (isAccessable)
            return createCustomReadStream(join(__dirname, input))
    } catch (error) {
        errorHandler(error)
    }
}

async function generateWriteStream(input) {
    try {
        const isAccessable = await isFileAccessable(input, 'w')
        if (isAccessable)
            return createCustomWriteStream(join(__dirname, output), { flags: 'a' })
    } catch (error) {
        errorHandler(error)
    }
}

function generateStream(type) {
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

module.exports = {
    handleError,
    errorHandler,
    isFileAccessable,
    generateReadStream,
    generateWriteStream,
    generateStream
}