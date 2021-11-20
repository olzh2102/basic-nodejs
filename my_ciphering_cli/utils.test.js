const fs = require('fs')
const { sanitize, errorHandler, isFileAccessable } = require('./utils')
const {NoSuchFileError, InvalidCipherPatternError} = require('./custom-errors')

describe('Utils', () => {
    it('sanitizes config, input and output flags', () => {
        let arg = '--config'
        let result = sanitize(arg)
        expect(result).toBe('-c')

        arg = 'random'
        result = sanitize(arg)
        expect(result).toBe('random')
    })

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
        errorHandler(error)

        expect(process.exit).toHaveBeenCalled()
        process.exit.mockRestore()
    })

    it('throws system error if isCustom flag is not found', () => {
        jest.spyOn(process, 'exit').mockImplementation(() => {})
    
        const result = () => errorHandler(new Error('sdad'))

        expect(result).toThrow()
        expect(process.exit).not.toHaveBeenCalled()
        process.exit.mockRestore()
    })

    it.todo('throws system error if isCustom flag is not found')
    
    it('returns true if passed path to file is accessible', () => {
        const existingPathToFile = './input.txt'
        
        return expect(isFileAccessable(existingPathToFile, 'r'))
            .resolves
            .toBe(true)
    })

    it('throws error if passed path to file is not there', () => {
        const nonExistingPathToFile = './inpsdasdasdfastafs.txt'

        return expect(isFileAccessable(nonExistingPathToFile, 'r'))
            .rejects
            .toThrowError(NoSuchFileError)
    })

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

    
})