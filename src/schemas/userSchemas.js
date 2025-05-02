import Joi from "joi";

export const userCreateSchema = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    "string.base": "O nome deve ser uma string",
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "string.max": "O nome não pode exceder 100 caracteres",
    "any.required": "O nome é obrigatório",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "O e-mail deve ser uma string",
    "string.email": "Por favor, forneça um endereço de e-mail válido",
    "string.empty": "O e-mail é obrigatório",
    "any.required": "O e-mail é obrigatório",
  }),

  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "O CPF deve ser uma string",
      "string.length": "O CPF deve ter exatamente 11 dígitos",
      "string.pattern.base": "O CPF deve conter apenas números",
      "string.empty": "O CPF é obrigatório",
      "any.required": "O CPF é obrigatório",
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
          "O CEP deve conter 8 dígitos sem caracteres especiais",
      }),
  })
    .required()
    .messages({
      "object.base": "O endereço deve ser um objeto",
      "any.required": "O endereço é obrigatório",
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
});

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
          "O CEP deve conter 8 dígitos sem caracteres especiais",
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
    "object.min": "Pelo menos um campo deve ser fornecido para atualização",
  });

export const documentUploadSchema = Joi.object({
  documentType: Joi.string().valid("RG", "CPF").required().messages({
    "string.base": "O tipo de documento deve ser uma string",
    "any.only": "O tipo de documento deve ser RG ou CPF",
    "any.required": "O tipo de documento é obrigatório",
  }),

  documentNumber: Joi.string().required().messages({
    "string.base": "O número do documento deve ser uma string",
    "string.empty": "O número do documento é obrigatório",
    "any.required": "O número do documento é obrigatório",
  }),
});

export const socialMediaConnectSchema = Joi.object({
  platform: Joi.string()
    .valid("instagram", "twitter", "twitch", "facebook")
    .required()
    .messages({
      "string.base": "A plataforma deve ser uma string",
      "any.only": "Plataforma não suportada",
      "any.required": "A plataforma é obrigatória",
    }),
  accountId: Joi.string().required().messages({
    "string.base": "O ID da conta deve ser uma string",
    "string.empty": "O ID da conta é obrigatório",
    "any.required": "O ID da conta é obrigatório",
  }),
});

export const esportsProfileSchema = Joi.object({
  platform: Joi.string()
    .valid("liquipedia", "hltv", "vlr", "octane")
    .required()
    .messages({
      "string.base": "A plataforma deve ser uma string",
      "any.only":
        "A plataforma deve ser uma das seguintes: liquipedia, hltv, vlr, octane",
      "any.required": "A plataforma é obrigatória",
    }),

  profileUrl: Joi.string().uri().required().messages({
    "string.base": "A URL do perfil deve ser uma string",
    "string.uri": "A URL do perfil deve ser uma URL válida",
    "string.empty": "A URL do perfil é obrigatória",
    "any.required": "A URL do perfil é obrigatória",
  }),
});

export default {
  userCreateSchema,
  userUpdateSchema,
  documentUploadSchema,
  socialMediaConnectSchema,
  esportsProfileSchema,
};
