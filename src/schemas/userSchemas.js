import Joi from "joi";

// Schema for creating a new user
export const userCreateSchema = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "CPF must be a string",
      "string.length": "CPF must be exactly 11 digits",
      "string.pattern.base": "CPF must contain only numbers",
      "string.empty": "CPF is required",
      "any.required": "CPF is required",
    }),

  address: Joi.object({
    street: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.string().allow("", null),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().length(2).required(),
    zipCode: Joi.string()
      .pattern(/^[0-9]{8}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Zip code must be 8 digits without special characters",
      }),
  })
    .required()
    .messages({
      "object.base": "Address must be an object",
      "any.required": "Address is required",
    }),
});

// Schema for updating user information
export const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  address: Joi.object({
    street: Joi.string(),
    number: Joi.string(),
    complement: Joi.string().allow("", null),
    neighborhood: Joi.string(),
    city: Joi.string(),
    state: Joi.string().length(2),
    zipCode: Joi.string()
      .pattern(/^[0-9]{8}$/)
      .messages({
        "string.pattern.base":
          "Zip code must be 8 digits without special characters",
      }),
  }),
  esportsInterests: Joi.array().items(Joi.string()),
  attendedEvents: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
      location: Joi.string().required(),
    })
  ),
  participatedActivities: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
      description: Joi.string(),
    })
  ),
  purchases: Joi.array().items(
    Joi.object({
      item: Joi.string().required(),
      date: Joi.date().required(),
      amount: Joi.number().positive().required(),
    })
  ),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

// Schema for document upload
export const documentUploadSchema = Joi.object({
  documentType: Joi.string().valid("RG", "CNH").required().messages({
    "string.base": "Document type must be a string",
    "any.only": "Document type must be either RG or CNH",
    "any.required": "Document type is required",
  }),

  documentNumber: Joi.string().required().messages({
    "string.base": "Document number must be a string",
    "string.empty": "Document number is required",
    "any.required": "Document number is required",
  }),

  // Note: The actual document image is handled by multer middleware
});

// Schema for connecting social media accounts
export const socialMediaConnectSchema = Joi.object({
  platform: Joi.string()
    .valid("instagram", "twitter", "twitch", "facebook")
    .required()
    .messages({
      "string.base": "Platform must be a string",
      "any.only":
        "Platform must be one of: instagram, twitter, twitch, facebook",
      "any.required": "Platform is required",
    }),

  accountId: Joi.string().required().messages({
    "string.base": "Account ID must be a string",
    "string.empty": "Account ID is required",
    "any.required": "Account ID is required",
  }),

  accessToken: Joi.string().required().messages({
    "string.base": "Access token must be a string",
    "string.empty": "Access token is required",
    "any.required": "Access token is required",
  }),
});

// Schema for validating e-sports profiles
export const esportsProfileSchema = Joi.object({
  platform: Joi.string()
    .valid("liquipedia", "hltv", "vlr", "octane")
    .required()
    .messages({
      "string.base": "Platform must be a string",
      "any.only": "Platform must be one of: liquipedia, hltv, vlr, octane",
      "any.required": "Platform is required",
    }),

  profileUrl: Joi.string().uri().required().messages({
    "string.base": "Profile URL must be a string",
    "string.uri": "Profile URL must be a valid URL",
    "string.empty": "Profile URL is required",
    "any.required": "Profile URL is required",
  }),
});

// Export all schemas as a single object for convenience
export default {
  userCreateSchema,
  userUpdateSchema,
  documentUploadSchema,
  socialMediaConnectSchema,
  esportsProfileSchema,
};
