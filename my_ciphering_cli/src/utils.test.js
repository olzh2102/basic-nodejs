const utils = require('./utils')

const { MARKS } = require('./constants')
const { NoSuchFileError, InvalidCipherPatternError } = require('./custom-errors')
const { createCustomReadStream, createCustomWriteStream } = require('../streams/custom-streams')
const { CaesarTransform } = require('../streams/transformer')

jest.mock('../streams/transformer')
jest.mock('../streams/custom-streams')

describe('Utils', () => {
    it('sanitizes config, input and output flags', () => {
        let arg = '--config'
        let result = utils.sanitize(arg)
        expect(result).toBe('-c')

        arg = 'random'
        result = utils.sanitize(arg)
        expect(result).toBe('random')
    })

    describe('error handler', () => {
        it('throws custom error if isCustom flag is found', () => {
            jest.spyOn(process, 'exit').mockImplementation(() => {})
            class CustomRandomError extends Error {
                constructor(msg) {
                    super(msg);
                    this.isCustom = true
                    this.name = 'CustomRandomError'
                }
            }
            const error = new CustomRandomError('custom error message')
            utils.errorHandler(error)
            
            expect(process.exit).toHaveBeenCalled()
            process.exit.mockRestore()
        })
        
        it('throws system error if isCustom flag is not found', () => {
            jest.spyOn(process, 'exit').mockImplementation(() => {})
            
            const result = () => utils.errorHandler(new Error('sdad'))
            
            expect(result).toThrow()
            expect(process.exit).not.toHaveBeenCalled()
            process.exit.mockRestore()
        })
    })
    
    describe('Checks if passed path to file exists or accessible', () => {
        it('returns true if passed path to file is accessible', () => {
            const existingPathToFile = './input.txt'
            
            return expect(utils.isFileAccessable(existingPathToFile, 'r'))
                .resolves
                .toBe(true)
        })
        
        it('throws error if passed path to file is not there', () => {
            const nonExistingPathToFile = './inpsdasdasdfastafs.txt'
            
            return expect(utils.isFileAccessable(nonExistingPathToFile, 'r'))
                .rejects
                .toThrowError(NoSuchFileError)
        })
    })

    describe('Generates read / write stream', () => {
        it('generates read stream if passed input path is correct', async () => {
            const existingPath = './input.txt'
            const isFileAccessable = jest
                .spyOn(utils, 'isFileAccessable')
                .mockResolvedValue(true)
            
            await isFileAccessable()
            await utils.generateReadStream(existingPath)
            
            expect(createCustomReadStream).toHaveBeenCalled()

            utils.isFileAccessable.mockRestore()
        })

        it('generates write stream if passed output path is correct', async () => {
            const existingPath = './output.txt'
            const isFileAccessable = jest
                .spyOn(utils, 'isFileAccessable')
                .mockResolvedValue(true)
            
            await isFileAccessable()
            await utils.generateWriteStream(existingPath)
            
            expect(createCustomWriteStream).toHaveBeenCalled()

            utils.isFileAccessable.mockRestore()
        })

        it('generates stream if passed mark exists in lookup', () => {
            const AVAILABLE_MARKS = Object.keys(MARKS)
            utils.generateStream(AVAILABLE_MARKS.find(m => m == 'C1'))
            expect(CaesarTransform).toHaveBeenCalled()
        })
    })

    describe('Throws Error if passed mark is not acceptable', () => {
        it('throws custom error if passed mark does not exist in lookup', () => {
            const nonExistingMark = 'G9'
            const result = () => utils.generateStream(nonExistingMark)
            expect(result).toThrowError(InvalidCipherPatternError)
        })

        it('throws custom error if passed mark is invalid Atbash', () => {
            const nonExistingMark = 'A8'
            const result = () => utils.generateStream(nonExistingMark)
            expect(result).toThrowError('Atbash type cannot have any leading number or letter!')
            expect(result).toThrowError(InvalidCipherPatternError)
        })
    })

    describe('Depending on pipeline path cb called with error or not', () => {
        it('pipeline goes to fail', () => {
            let error = new Error('error')
            jest.spyOn(process, 'exit').mockImplementation(() => {})
            jest.spyOn(console, 'log').mockImplementation(() => {})
            
            utils.pipelineErrorCb(error)
    
            expect(process.exit).toHaveBeenCalled()
    
            process.exit.mockRestore()
        })
    
        it('pipeline goes to succeeded way', () => {
            jest.spyOn(process, 'exit').mockImplementation(() => {})
            jest.spyOn(console, 'log').mockImplementation(() => {})
            
            let error = undefined
            
            utils.pipelineErrorCb(error)
    
            expect(process.exit).not.toHaveBeenCalled()
            expect(console.log).toHaveBeenCalled()
    
            process.exit.mockRestore()
            console.log.mockRestore()
        })
    })

    it('returns process stdin if input not found', () => {
        jest.spyOn(process.stdout, 'write').mockImplementation((txt) => txt)
        jest.spyOn(process.stdin, 'resume').mockImplementation(() => {})

        const result = utils.consoleReadStream()

        expect(process.stdout.write).toHaveBeenCalledWith('Please enter your text here: \n')
        expect(process.stdin.resume).toHaveBeenCalled()
        expect(result).not.toBeUndefined()
    })
})