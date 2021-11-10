const ALLOWED_CIPHER_PATTERNS = ['C1', 'C0', 'R0', 'R1', 'A'] 

function validate({ flags, pattern }, exit) {
    pattern = pattern.split('-')

    for (let c of pattern)
        if (!(ALLOWED_CIPHER_PATTERNS.includes(c)))
            exit('Cipher pattern does not match the template. Pattern can be "C" followed by "1" or "0", "R" followed by "1" or "0"')
}

module.exports = validate
