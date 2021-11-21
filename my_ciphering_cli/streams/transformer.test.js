const { CaesarTransform, Rot8Transform, AtbashTransform} = require('./transformer')
const cipher = require('../src/cipher')
const { CAESAR_SHIFT, ROT8_SHIFT, ATBASH_FLAG } = require('../src/constants')

describe('Caesar', () => {
    it('transforms chunks with inner transformer function from constructor - Caesar', async () => {
        const tStream = new CaesarTransform(cipher(CAESAR_SHIFT.DECODE));
        tStream._transform("works", "UTF-8", () => {});
    
        tStream.on("data", (data) => {
            expect(String(data)).toEqual("vnqjr");
        });
    });

    it('transforms chunks with inner transformer function from constructor - ROT8', async () => {
        const tStream = new Rot8Transform(cipher(ROT8_SHIFT.ENCODE));
        tStream._transform("works", "UTF-8", () => {});
    
        tStream.on("data", (data) => {
            expect(String(data)).toEqual("ogjck");
        });
    });

    it('transforms chunks with inner transformer function from constructor - Atbash', async () => {
        const tStream = new AtbashTransform(cipher(ATBASH_FLAG));
        tStream._transform("works", "UTF-8", () => {});
    
        tStream.on("data", (data) => {
            expect(String(data)).toEqual("dliph");
        });
    });
})