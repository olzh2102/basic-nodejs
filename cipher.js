const { aCode, ACode } = require('./constants');

function cipher(shift) {
    return (text) => [...text].reduce((res, ch) => res.concat(replace(ch, shift)), '')
}

module.exports = cipher;

function replace(ch, shift) {
    let chCode = ch.charCodeAt()

    if ('a' <= ch && ch <= 'z')
        return shift == 'atb' 
            ? atbash(chCode, aCode) 
            : String.fromCharCode(aCode + (chCode - aCode + shift + 26) % 26)
    
    if ('A' <= ch && ch <= 'Z')
        return shift == 'atb' 
            ? atbash(chCode, ACode) 
            : String.fromCharCode(ACode + (chCode - ACode + shift + 26) % 26)

    return ch
}

function atbash(chCode, firstLetterCode) {
    let position = chCode - firstLetterCode
    position = 25 - position
    return String.fromCharCode(position + firstLetterCode)
}