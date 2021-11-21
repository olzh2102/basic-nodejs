const fs = require('fs')
const { createCustomReadStream, createCustomWriteStream } = require('./custom-streams')

describe('Custom Read and Write Streams', () => {
    it('custom read stream', () => {
        jest.spyOn(fs, 'open')
        jest.spyOn(fs, 'read')
        const existingFilePath = './input.txt'
        
        const rStream = createCustomReadStream(existingFilePath)
        rStream._construct(() => {}) 
        rStream._read(13)

        expect(fs.open).toHaveBeenCalled()
        expect(fs.read).toHaveBeenCalled()

        fs.open.mockRestore()
        fs.read.mockRestore()
    })

    it('custom write stream', () => {
        jest.spyOn(fs, 'open')
        jest.spyOn(fs, 'write')
        const existingFilePath = './output.txt'
        
        const wStream = createCustomWriteStream(existingFilePath, { flags: 'a' })
        wStream._construct(() => {}) 
        wStream._write('works', null, () => {})

        expect(fs.open).toHaveBeenCalled()
        expect(fs.write).toHaveBeenCalled()

        fs.open.mockRestore()
        fs.write.mockRestore()
    })
})