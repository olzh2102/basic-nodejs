const fs = require('fs')
const { createCustomReadStream } = require('./custom-streams')

describe('Custom Read and Write Streams', () => {
    it('works', async () => {
        jest.spyOn(fs, 'open')
        jest.spyOn(fs, 'read')
        const existingFilePath = './ss.txt'
        
        const rStream = await createCustomReadStream(existingFilePath)
        rStream._construct() 
        rStream._read(13)

        expect(fs.open).toHaveBeenCalled()
        expect(fs.read).toHaveBeenCalled()

        fs.open.mockRestore()
        fs.read.mockRestore()
    })
})