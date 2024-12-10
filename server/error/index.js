/**
 * Class error for login
 * @param {string} message - message error
 * @param {number} statusCode - status code error
 * @param {object} details - details error
 * @param {boolean} isOpenrational - check error is operational or not
 */
export class MainError extends Error {
    constructor(
        message,
        statusCode,
        details = null,
        isOpenrational = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.isOpenrational = isOpenrational;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class UnauthorizedError extends MainError {
    constructor(message = "Unauthorized", details = null) {
        super(message, 401,details);
    } 
    

}
export class NotfoundError extends MainError {
    constructor(message = "Not found", details = null) {
        super(message, 404, details);
    }
}
export class BadRequestError extends MainError {
    constructor(message = "Bad request", details = null) {    
        super(message, 400, details);
    }   
}
export class OkError extends MainError {
    constructor(message = "Ok", details = null) {    
        super(message, 200, details);
    }   
}
export class CreatedError extends MainError {
    constructor(message = "Created", details = null) {    
        super(message, 201, details);
    }   
}
export class ServerError extends MainError {
    constructor(message = "Server error", details = null) {    
        super(message, 500, details);
    }   
}
export class NoContentError extends MainError {
    constructor(message = "No content", details = null) {    
        super(message, 204, details);
    }   
}
