function handleError(error) {
    if (error)
        console.error('Pipeline failed.', error)
    else
        console.log('Pipeline succeeded.');
}

function errorHandler(err) {
    let { isCustom, name, message } = err

    if (isCustom) {
        process.stderr.write(`${name}: ${message}`)
        process.exit(1)
    } else throw err
}

module.exports = {
    handleError,
    errorHandler
}