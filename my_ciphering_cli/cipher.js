const {
    A,
    Z,
    CAPITAL_A,
    CAPITAL_Z,
    ATBASH_FLAG,
    ALPHABET_SIZE,
    ALPHABER_LAST_POSITION
} = require('./constants')

const aCode = A.charCodeAt()
const ACode = CAPITAL_A.charCodeAt()

function cipher(shift) {
    return (text) => [...text].reduce((res, ch) => res.concat(replace(ch, shift)), '')
}

module.exports = cipher;

function replace(ch, shift) {
    let chCode = ch.charCodeAt()

    if (A <= ch && ch <= Z)
        return shift == ATBASH_FLAG 
            ? atbash(chCode, aCode) 
            : String.fromCharCode(aCode + (chCode - aCode + shift + ALPHABET_SIZE) % ALPHABET_SIZE)
    
    if (CAPITAL_A <= ch && ch <= CAPITAL_Z)
        return shift == ATBASH_FLAG 
            ? atbash(chCode, ACode) 
            : String.fromCharCode(ACode + (chCode - ACode + shift + ALPHABET_SIZE) % ALPHABET_SIZE)

    return ch
}

function atbash(chCode, firstLetterCode) {
    let position = chCode - firstLetterCode
    position = ALPHABER_LAST_POSITION - position
    return String.fromCharCode(position + firstLetterCode)
}