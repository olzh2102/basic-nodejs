const parse = require('./parser')
const { RepeatedArgumentError, NoValueFoundAfterFlagError, NoConfigArgumentProvidedError } = require('./custom-errors')

describe('Parser', () => {
    it('returns expected inputPath, outputPath and cipher pattern', () => {
        const args = ['-c', 'C1-R1-C0-R0-A', '--input', './input.txt', '-o', './output.txt']
        const result = parse(args)
        expect(result).toEqual({
            input: './input.txt',
            output: './output.txt',
            pattern: 'C1-R1-C0-R0-A'
        })
    })

    it('throws Error if any argument is appeared more than once', () => {
        const args = ['-c', 'C1', '-c']
        const result = () => parse(args)
        expect(result).toThrowError(RepeatedArgumentError)
    })

    it('throws Error if no value provided after flag', () => {
        const args = ['-c', 'C1', '-i']
        const result = () => parse(args)
        expect(result).toThrowError(NoValueFoundAfterFlagError)
    })

    it('throws Error if no config flag provided', () => {
        const args = ['C1', '-i', './input.txt']
        const result = () => parse(args)
        expect(result).toThrowError(NoConfigArgumentProvidedError)
    })

    it('throws Error if short and long aliases of the same config provided', () => {
        const args = ['-c', 'C1', '--config', '-i', './input.txt']
        const result = () => parse(args)
        expect(result).toThrowError('-c is repeated, please check!')
        expect(result).toThrowError(RepeatedArgumentError)
    })

    it.todo('throws Error if no config flag provided')
    it.todo('throws Error if user types short and long variants of same flag')
})