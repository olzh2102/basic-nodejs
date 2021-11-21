const { CaesarTransform, Rot8Transform, AtbashTransform} = require('./transformer')
const cipher = require('../cipher')

describe('Caesar', () => {
    it("should use proper cipher C0", async () => {
        const tStream = new CaesarTransform(cipher(-1));
        tStream._transform("works", "UTF-8", () => {});
    
        tStream.on("data", (data) => {
            expect(String(data)).toEqual("vnqjr");
        });
    });

    it("should use proper cipher C0", async () => {
        const tStream = new Rot8Transform(cipher(-8));
        tStream._transform("works", "UTF-8", () => {});
    
        tStream.on("data", (data) => {
            expect(String(data)).toEqual("ogjck");
        });
    });

    it("should use proper cipher C0", async () => {
        const tStream = new AtbashTransform(cipher('atb'));
        tStream._transform("works", "UTF-8", () => {});
    
        tStream.on("data", (data) => {
            expect(String(data)).toEqual("dliph");
        });
    });
})