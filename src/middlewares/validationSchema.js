import HttpResponse from "../utils/httpResponse.js";

/**
 * Creates a validation middleware using the provided Joi schema
 * @param {Object} schema - Joi schema to validate against
 * @param {String} property - Request property to validate (body, params, query)
 * @returns {Function} Express middleware function
 */
export const validateSchema = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (!error) {
      return next();
    }

    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return HttpResponse.badRequest(res, "Validation error", {
      error: errorMessage,
    });
  };
};
