const parse = require('./parser')
const { RepeatedArgumentError } = require('./custom-errors')

describe('Parser', () => {
    it('throws Error if any argument is appeared more than once', () => {
        const args = ['-c', 'C1', '-c']
        const result = () => parse(args)
        expect(result).toThrowError(RepeatedArgumentError)
    })

    it.todo('returns expected inputPath, outputPath and cipher pattern')
    it.todo('throws Error if any argument is appeared more than once')
    it.todo('throws Error if no config flag provided')
    it.todo('throws Error if user types short and long variants of same flag')
    it.todo('throws Error if no value provided after flag')
})