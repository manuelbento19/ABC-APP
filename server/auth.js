const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const secretKey = 'GoodBless@2024'; 

// Função para gerar um JWT
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

// Função para verificar um JWT
const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

// Função para hash da senha
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
};

// Função para comparar a senha com o hash
const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };