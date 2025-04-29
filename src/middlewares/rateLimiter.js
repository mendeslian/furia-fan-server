import rateLimit from "express-rate-limit";
import HttpResponse from "../utils/httpResponse.js";

// Create a rate limiter middleware
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    return HttpResponse.tooManyRequests(
      res,
      "Too many requests, please try again later.",
      { retryAfter: Math.ceil((15 * 60) / 60) } // in minutes
    );
  },
});
