import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
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
      type: DataTypes.JSON,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.ENUM("RG", "CPF"),
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
      type: DataTypes.JSON,
      allowNull: true,
    },
    esportsInterests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    attendedEvents: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    participatedActivities: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    purchases: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    socialMediaAccounts: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    socialMediaInteractions: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    interactionSummary: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    esportsProfiles: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    profileValidationResults: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
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

User.prototype.getInteractionSummary = function () {
  return this.interactionSummary;
};

User.findByDocument = async function (documentType, documentNumber) {
  return await User.findOne({
    where: {
      documentType,
      documentNumber,
    },
  });
};
User.findByDocument = async function (documentType, documentNumber) {
  return await User.findOne({
    where: {
      documentType,
      documentNumber,
    },
  });
};

User.sync({ alter: true });

export default User;
