/**
 * HttpResponse - A class for standardized HTTP responses
 */
class HttpResponse {
  /**
   * Send a standardized HTTP response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @param {Boolean} success - Whether the operation was successful
   * @returns {Object} Express response
   */
  static send(res, statusCode, message, data = null, success = true) {
    const response = {
      message,
    };

    if (data !== null) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send a success response (200)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static success(res, message = "Operation successful", data = null) {
    return this.send(res, 200, message, data, true);
  }

  /**
   * Send a created response (201)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static created(res, message = "Resource created successfully", data = null) {
    return this.send(res, 201, message, data, true);
  }

  /**
   * Send a bad request response (400)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static badRequest(res, message = "Bad request", data = null) {
    return this.send(res, 400, message, data, false);
  }

  /**
   * Send an unauthorized response (401)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static unauthorized(res, message = "Unauthorized", data = null) {
    return this.send(res, 401, message, data, false);
  }

  /**
   * Send a forbidden response (403)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static forbidden(res, message = "Forbidden", data = null) {
    return this.send(res, 403, message, data, false);
  }

  /**
   * Send a not found response (404)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static notFound(res, message = "Resource not found", data = null) {
    return this.send(res, 404, message, data, false);
  }

  /**
   * Send a server error response (500)
   * @param {Object} res - Express response object
   * @param {String} message - Response message
   * @param {Object} data - Optional data payload
   * @returns {Object} Express response
   */
  static serverError(res, message = "Internal server error", data = null) {
    return this.send(res, 500, message, data, false);
  }
}

export default HttpResponse;
