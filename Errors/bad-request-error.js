import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error.js";

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError