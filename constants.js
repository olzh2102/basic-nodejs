const cipher = require('./cipher')
const { 
    CaesarTransform, 
    Rot8Transform,
    AtbashTransform 
} = require('./transformer')

const aCode = 'a'.charCodeAt()
const ACode = 'A'.charCodeAt()

const ALLOWED_FLAGS = ['-c', '--config', '-i', '--input', '-o', '--output']
const ALLOWED_CIPHER_TYPES = ['C1', 'C0', 'R1', 'R0', 'A']

const TR_STREAMS_MAP = {
    'C1': new CaesarTransform(cipher(1)),
    'C0': new CaesarTransform(cipher(-1)),
    'R1': new Rot8Transform(cipher(8)),
    'R0': new Rot8Transform(cipher(-8)),
    'A': new AtbashTransform(cipher('atb'))
}

module.exports = {
    aCode,
    ACode,
    ALLOWED_FLAGS,
    ALLOWED_CIPHER_TYPES,
    TR_STREAMS_MAP
}