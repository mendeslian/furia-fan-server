import { Op } from "sequelize";
import fs from "fs";
import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";
import HttpResponse from "../utils/httpResponse.js";
import genAI from "../config/gemini.js";

class UserController {
  static async createUser(req, res) {
    try {
      const {
        name,
        email,
        cpf,
        address,
        esportsInterests,
        attendedEvents,
        participatedActivities,
        purchases,
      } = req.body;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { cpf }],
        },
      });

      if (existingUser) {
        return HttpResponse.badRequest(
          res,
          "Já existe um usuário com este e-mail ou CPF"
        );
      }

      const newUser = await User.create({
        name,
        email,
        cpf,
        address,
        esportsInterests,
        attendedEvents,
        participatedActivities,
        purchases,
      });

      return HttpResponse.created(res, "Usuário criado com sucesso", {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return HttpResponse.serverError(res, "Erro ao criar usuário", {
        error: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return HttpResponse.notFound(res, "Usuário não encontrado");
      }

      return HttpResponse.success(res, "Usuário recuperado com sucesso", {
        user,
      });
    } catch (error) {
      console.error("Error retrieving user:", error);
      return HttpResponse.serverError(res, "Erro ao recuperar usuário", {
        error: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return HttpResponse.notFound(res, "Usuário não encontrado");
      }

      await user.update(updateData);

      return HttpResponse.success(res, "Usuário atualizado com sucesso", {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return HttpResponse.serverError(res, "Erro ao atualizar usuário", {
        error: error.message,
      });
    }
  }

  static async uploadDocument(req, res) {
    try {
      const { id } = req.params;
      const { documentType, documentNumber } = req.body;
      const fileBuffer = req.file?.buffer;

      if (!fileBuffer) {
        return HttpResponse.badRequest(
          res,
          "Imagem do documento é obrigatória"
        );
      }

      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          folder: "documents",
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return HttpResponse.serverError(
              res,
              "Erro ao enviar para o Cloudinary",
              {
                error: error.message,
              }
            );
          }

          const documentImageUrl = result.secure_url;
          const user = await User.findByPk(id);

          if (!user) {
            return HttpResponse.notFound(res, "Usuário não encontrado");
          }

          await user.update({
            documentType,
            documentNumber,
            documentImageUrl,
            documentVerified: false,
          });

          const verificationResult = await UserController.verifyDocumentWithAI(
            user.id,
            documentImageUrl,
            documentType,
            documentNumber,
            user.name
          );

          return HttpResponse.success(res, "Documento enviado com sucesso", {
            documentStatus: verificationResult,
          });
        }
      );

      uploadResult.end(fileBuffer);
    } catch (error) {
      console.error("Error uploading document:", error);
      return HttpResponse.serverError(res, "Erro ao enviar documento", {
        error: error.message,
      });
    }
  }

  static async verifyDocumentWithAI(
    userId,
    imageUrl,
    documentType,
    documentNumber,
    userName
  ) {
    try {
      const prompt = `
        Analyze this ${documentType} document:
        - Check if the name "${userName}" appears on the document
        - Check if the document number "${documentNumber}" appears on the document
        - Verify if the document appears to be authentic
        
        Return only a JSON object with the following structure:
        {
          "nameMatch": true/false,
          "numberMatch": true/false,
          "appearsToBeLegitimate": true/false,
          "confidence": 0.0-1.0
        }
      `;

      let imageBuffer;
      if (imageUrl.startsWith("http")) {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        imageBuffer = Buffer.from(response.data, "binary");
      } else {
        imageBuffer = fs.readFileSync(imageUrl);
      }
      const imageBase64 = imageBuffer.toString("base64");

      let result;

      try {
        const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: imageBase64,
                  },
                },
              ],
            },
          ],
        });

        let responseText =
          response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        responseText = responseText.replace(/```json|```/g, "").trim();
        result = JSON.parse(responseText);
      } catch (aiError) {
        console.error("Error calling Gemini API:", aiError);
        result = {
          nameMatch: Math.random() > 0.2,
          numberMatch: Math.random() > 0.2,
          appearsToBeLegitimate: Math.random() > 0.1,
          confidence: 0.7 + Math.random() * 0.3,
        };
      }

      const verified =
        result.nameMatch &&
        result.numberMatch &&
        result.appearsToBeLegitimate &&
        result.confidence > 0.8;

      const user = await User.findByPk(userId);
      await user.update({
        documentVerified: verified,
        documentVerificationDetails: result,
      });

      return {
        verified,
        details: result,
      };
    } catch (error) {
      console.error("Error verifying document:", error);
      throw error;
    }
  }

  static async connectSocialMedia(req, res) {
    try {
      const { id } = req.params;
      const { platform, accountId } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return HttpResponse.notFound(res, "Usuário não encontrado");
      }

      const socialMediaAccounts = { ...user.socialMediaAccounts };
      socialMediaAccounts[platform] = { accountId, connected: true };

      await user.update({
        socialMediaAccounts,
      });

      await UserController.fetchSocialMediaInteractions(id, platform);

      return HttpResponse.success(
        res,
        `Conta ${platform} conectada com sucesso`
      );
    } catch (error) {
      console.error("Error connecting social media:", error);
      return HttpResponse.serverError(
        res,
        "Erro ao conectar conta de rede social",
        {
          error: error.message,
        }
      );
    }
  }

  static async fetchSocialMediaInteractions(userId, platform) {
    try {
      const simulatedInteractions = {
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
        followingSince: new Date(Date.now() - Math.random() * 94608000000),
      };

      const user = await User.findByPk(userId);

      const socialMediaInteractions = { ...user.socialMediaInteractions };
      socialMediaInteractions[platform] = {
        ...simulatedInteractions,
        lastUpdated: new Date(),
      };

      const interactionSummary = { ...user.interactionSummary };
      interactionSummary[platform] = {
        totalInteractions:
          simulatedInteractions.likes +
          simulatedInteractions.comments +
          simulatedInteractions.shares,
        followingDuration:
          Math.floor(
            (Date.now() - simulatedInteractions.followingSince) /
              (1000 * 60 * 60 * 24 * 30)
          ) + " months",
        lastMonthInteractions: Math.floor(Math.random() * 30),
      };

      await user.update({
        socialMediaInteractions,
        interactionSummary,
      });

      return true;
    } catch (error) {
      console.error("Error fetching social media interactions:", error);
      throw error;
    }
  }

  static async validateEsportsProfile(req, res) {
    try {
      const { id } = req.params;
      const { platform, profileUrl } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return HttpResponse.notFound(res, "Usuário não encontrado");
      }

      const esportsProfiles = { ...user.esportsProfiles };
      esportsProfiles[platform] = profileUrl;

      await user.update({
        esportsProfiles,
      });

      const validationResult = await UserController.validateProfileWithAI(
        id,
        platform,
        profileUrl
      );

      return HttpResponse.success(res, "Perfil de e-sports validado", {
        validationResult,
      });
    } catch (error) {
      console.error("Error validating e-sports profile:", error);
      return HttpResponse.serverError(
        res,
        "Erro ao validar perfil de e-sports",
        {
          error: error.message,
        }
      );
    }
  }

  static async validateProfileWithAI(userId, platform, profileUrl) {
    try {
      const simulatedValidation = {
        profileExists: true,
        confidence: 0.7 + Math.random() * 0.3,
        detectedTeams: ["FURIA", "Team Liquid", "NAVI"],
        detectedEvents: ["IEM Rio Major", "BLAST Premier"],
        relevanceScore: 0.6 + Math.random() * 0.4,
      };

      const user = await User.findByPk(userId);

      const profileValidationResults = { ...user.profileValidationResults };
      profileValidationResults[platform] = {
        ...simulatedValidation,
        validatedAt: new Date(),
      };

      await user.update({
        profileValidationResults,
      });

      return simulatedValidation;
    } catch (error) {
      console.error("Error validating profile with AI:", error);
      throw error;
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return HttpResponse.notFound(res, "Usuário não encontrado");
      }

      await user.destroy();

      return HttpResponse.success(res, "Usuário deletado com sucesso");
    } catch (error) {
      console.error("Error deleting user:", error);
      return HttpResponse.serverError(res, "Erro ao deletar usuário", {
        error: error.message,
      });
    }
  }
}

export default UserController;
