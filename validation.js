const { ALLOWED_FLAGS } = require('./constants')
const ALLOWED_CIPHER_PATTERNS = ['C1', 'C0', 'R0', 'R1', 'A'] 

function validate({ flags, pattern }, exit) {
    pattern = pattern.split('-')

    let map = new Map()

    for (let flag of flags) {
        if (flag === "-c" || flag === "--config")
            if (map.has("c"))
                exit('Flag duplication. Please check your command')    
            else 
                map.set("c", 1)
    }

    for (let c of pattern)
        if (!(ALLOWED_CIPHER_PATTERNS.includes(c)))
            exit(`Cipher pattern does not match the template. 
                  Pattern can be "C" followed by "1" or "0", 
                  "R" followed by "1" or "0"`)
}

module.exports = validate
