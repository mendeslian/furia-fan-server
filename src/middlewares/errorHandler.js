import HttpResponse from "../utils/httpResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Global error:", err);

  if (err.name === "ValidationError") {
    return HttpResponse.badRequest(res, "Erro de Validação", {
      error: err.message,
    });
  }

  return HttpResponse.serverError(res, "Ocorreu um erro inesperado", {
    error:
      process.env.NODE_ENV === "production"
        ? "Erro Interno do Servidor"
        : err.message,
  });
};
