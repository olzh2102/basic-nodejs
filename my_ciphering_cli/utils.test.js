const { sanitize, errorHandler } = require('./utils')

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

    it.todo('throws system error if isCustom flag is not found')
})