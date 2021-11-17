const cipher = require('./cipher')
const { CAESAR_SHIFT, ROT8_SHIFT, ATBASH_FLAG } = require('./constants')

describe('Cipher function', () => {
    it('encodes the given text with Caesar cipher', () => {
        const text = 'Hello World'
        const encode = cipher(CAESAR_SHIFT.ENCODE)

        const result = encode(text)

        expect(result).toBe('Ifmmp Xpsme')
    })
    
    it('decodes the given text with Caesar cipher', () => {
        const text = 'Ifmmp Xpsme'
        const decode = cipher(CAESAR_SHIFT.DECODE)

        const result = decode(text)

        expect(result).toBe('Hello World')
    })

    it('encodes the given text with ROT-8 cipher', () => {
        const text = 'Hello World'
        const encode = cipher(ROT8_SHIFT.ENCODE)

        const result = encode(text)

        expect(result).toBe('Zwddg Ogjdv')
    })

    it('decodes the given text with ROT-8 cipher', () => {
        const text = 'Zwddg Ogjdv'
        const decode = cipher(ROT8_SHIFT.DECODE)

        const result = decode(text)

        expect(result).toBe('Hello World')
    })

    it('mirrors letters with ATBASH cipher', () => {
        const text = 'Hello World'
        const atbash = cipher(ATBASH_FLAG)

        const result = atbash(text)

        expect(result).toBe('Svool Dliow')
    })

    it('does not decodes/encodes any letters except latin', () => {
        const text = 'Hello World, привет МИР!!!'

        let encode = cipher(CAESAR_SHIFT.ENCODE)
        let result = encode(text)
        expect(result).toBe('Ifmmp Xpsme, привет МИР!!!')

        encode = cipher(ROT8_SHIFT.ENCODE)
        result = encode(text)
        expect(result).toBe('Zwddg Ogjdv, привет МИР!!!')

        decode = cipher(ROT8_SHIFT.DECODE)
        result = decode(text)
        expect(result).toBe('Pmttw Ewztl, привет МИР!!!')
    })
})