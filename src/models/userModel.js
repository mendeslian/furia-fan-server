import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    // Personal Information
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11],
        isNumeric: true,
      },
    },
    address: {
      type: DataTypes.JSON, // Stores street, number, city, state, zip code
      allowNull: false,
    },

    // Document Verification
    documentType: {
      type: DataTypes.ENUM("RG", "CNH"),
      allowNull: true,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documentImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documentVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    documentVerificationDetails: {
      type: DataTypes.JSON, // Stores verification results from AI
      allowNull: true,
    },

    // E-sports Interests and Behavior
    esportsInterests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    attendedEvents: {
      type: DataTypes.JSON, // Array of events with dates, names, locations
      defaultValue: [],
    },
    participatedActivities: {
      type: DataTypes.JSON, // Array of activities with details
      defaultValue: [],
    },
    purchases: {
      type: DataTypes.JSON, // Array of purchases with dates, items, amounts
      defaultValue: [],
    },

    // Social Media Integration
    socialMediaAccounts: {
      type: DataTypes.JSON, // Object with platform names and account IDs
      defaultValue: {},
    },
    socialMediaInteractions: {
      type: DataTypes.JSON, // Detailed interactions with e-sports orgs
      defaultValue: {},
    },
    interactionSummary: {
      type: DataTypes.JSON, // Processed summary of interactions
      defaultValue: {},
    },

    // E-sports Profile Validations
    esportsProfiles: {
      type: DataTypes.JSON, // Object with platform names and profile URLs
      defaultValue: {},
    },
    profileValidationResults: {
      type: DataTypes.JSON, // Results from AI validation of profiles
      defaultValue: {},
    },

    // System fields
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Define instance methods if needed
User.prototype.getInteractionSummary = function () {
  return this.interactionSummary;
};

// Define class methods if needed
User.findByDocument = async function (documentType, documentNumber) {
  return await User.findOne({
    where: {
      documentType,
      documentNumber,
    },
  });
};

// Sync model with database
// User.sync({ alter: true }); // Uncomment this in development to update table schema

export default User;
