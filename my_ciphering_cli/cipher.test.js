const cipher = require('./cipher')

describe('Cipher function', () => {
    it('should replace each character of sentence', () => {
        const a = cipher(-1)('Hello World')
        expect(a).toBe('Gdkkn Vnqkc')
    })
    it('should replace each character of sentence', () => {
        
    })
})
