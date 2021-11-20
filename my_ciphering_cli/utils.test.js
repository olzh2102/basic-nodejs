const fs = require('fs')
const utils = require('./utils')
const {NoSuchFileError, InvalidCipherPatternError} = require('./custom-errors')
const { createCustomReadStream, createCustomWriteStream } = require('./streams/custom-streams')

const { MARKS } = require('./constants')
const { 
    CaesarTransform, 
    Rot8Transform,
    AtbashTransform 
} = require('./streams/transformer')
const cipher = require('./cipher')

jest.mock('./streams/transformer')
jest.mock('./streams/custom-streams')

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

    it.todo('throws system error if isCustom flag is not found')
    
    describe('Is passed accessible', () => {
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

    // it('throws error if passed input path is incorrect', async () => {
    //     const nonExistingPath = './idasdasdasnput.txt'
    //     const isFileAccessable = jest
    //         .spyOn(utils, 'isFileAccessable')
    //         .mockRejectedValue(false)

        
    //     await isFileAccessable()
    //     const result = await utils.generateReadStream(nonExistingPath)
        
    //     expect(createCustomReadStream).not.toHaveBeenCalled()

    //     utils.isFileAccessable.mockRestore()
    // })

    // it('returns true if passed path to file is accessible', async () => {
    //     class CustomRandomError extends Error {
    //         constructor(msg) {
    //             super(msg);
    //             this.isCustom = true
    //             this.name = 'CustomRandomError'
    //         }
    //     }

    //     const error = new CustomRandomError('custom error message')

    //     const nonExistingPath = './input.txt'

    //     expect.assertions(1)
    
    //     const fn = jest
    //         .spyOn(fs, 'access')
    //         // .mockImplementationOnce(() => console.log('fuck'))
    //         .mockImplementationOnce((path, mode, cb) => cb())


    //     fn()
    //     const result = async () => {
    //         try {
    //             await isFileAccessable('./inpsda.txt', 'r')
    //         }  catch(e) {
    //             expect(result).toThrow(e)
    //         }
    //     }

    //     // const result = await isFileAccessable(nonExistingPath, 'r')

    // })

    it.todo('throws error if passed path does not exist or not accessible')

    it('generates stream if passed mark exists in lookup', () => {
        const AVAILABLE_MARKS = Object.keys(MARKS)
        utils.generateStream(AVAILABLE_MARKS.find(m => m == 'C1'))
        expect(CaesarTransform).toHaveBeenCalled()
    })

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