function handleError(error) {
    if (error)
        console.error('Pipeline failed.', error)
    else
        console.log('Pipeline succeeded.');
}

module.exports = {
    handleError
}