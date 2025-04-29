import HttpResponse from "../utils/httpResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Global error:", err);

  if (err.name === "ValidationError") {
    return HttpResponse.badRequest(res, "Validation Error", {
      error: err.message,
    });
  }

  return HttpResponse.serverError(res, "An unexpected error occurred", {
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
};
