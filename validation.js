const ALLOWED_CIPHER_PATTERNS = ['C1', 'C0', 'R0', 'R1', 'A'] 

function validate({ flags, pattern }, exit) {
    pattern = pattern.split('-')
    for (let c of pattern)
        if (!(ALLOWED_CIPHER_PATTERNS.includes(c)))
            exit()
}

module.exports = validate
