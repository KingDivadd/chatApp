const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api-error");

class UnAuthorizedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.status = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthorizedError