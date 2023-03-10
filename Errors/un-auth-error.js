import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error.js";

class UnAuthenticationError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnAuthenticationError