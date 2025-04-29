import Joi from "joi";

export const chatMessageSchema = Joi.object({
  message: Joi.string().required().min(1).max(300).messages({
    "string.base": "Message must be a text string",
    "string.empty": "Message cannot be empty",
    "string.min": "Message must be at least 1 character long",
    "string.max": "Message cannot exceed 300 characters",
    "any.required": "Message is required",
  }),
  history: Joi.array()
    .items(
      Joi.object({
        role: Joi.string().valid("user", "model").required().messages({
          "string.base": "Role must be a string",
          "string.empty": "Role cannot be empty",
          "string.valid": "Role must be either 'user' or 'model'",
          "any.required": "Role is required",
        }),
        parts: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required().messages({
                "string.base": "Text must be a string",
                "string.empty": "Text cannot be empty",
                "any.required": "Text is required",
              }),
            })
          )
          .required()
          .messages({
            "array.base": "Parts must be an array",
            "any.required": "Parts is required",
          }),
      })
    )
    .optional()
    .default([])
    .messages({
      "array.base": "History must be an array",
    }),
});
