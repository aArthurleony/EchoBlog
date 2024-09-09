import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const Usuario = conn.define(
  "usuarios",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      timestamps: false,
    },
    papel: {
      type: DataTypes.ENUM,
      defaultValue: "leitor",
      values: ["administrador", "autor", "leitor"],
    },
  },
  {
    tableName: "usuarios",
  }
);

export default Usuario;
