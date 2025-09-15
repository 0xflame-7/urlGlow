const bcrypt = require("bcrypt");
const SALT_ROUNDS = require("../config/core").SALT_ROUNDS;

const hashPasswordForUser = async (password) =>
  await bcrypt.hash(password, SALT_ROUNDS);

const comparePasswordWithHash = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = { hashPasswordForUser, comparePasswordWithHash };
