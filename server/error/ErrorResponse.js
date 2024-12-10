/**
 * Function to handle authorization errors
 * @param {Object} res - Express response object
 * @param {Object} error - Error object
 * @param {Number} defaultStatusCode - Default status code if not provided in the error object
 */
const authorizationError = (res, error, defaultStatusCode = 401) => {
    const statusCode = error.statusCode || defaultStatusCode;

    return res.status(statusCode).json({
        message: error.message || 'Unauthorized',
        success: false,
        data: null
    })
}
const rollerError = (res, error, defaultStatusCode = 401) => {
    const statusCode = error.statusCode || defaultStatusCode;

    return res.status(statusCode).json({
        message: error.message || 'Roller Error',
        success: false,
        data: null
    })  
}
const  createError = (res, error, defaultStatusCode = 404) => {
    const statusCode = error.statusCode || defaultStatusCode;

    return res.status(statusCode).json({
        message: error.message || 'Roller Error',
        success: false,
        data: null
    })

}
export {
    authorizationError,
    rollerError,
    createError
}