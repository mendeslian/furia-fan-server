import rateLimit from "express-rate-limit";
import HttpResponse from "../utils/httpResponse.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return HttpResponse.tooManyRequests(
      res,
      "Muitas requisições, tente novamente mais tarde",
      { retryAfter: Math.ceil((15 * 60) / 60) }
    );
  },
});
