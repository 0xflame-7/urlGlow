const bcrypt = require("bcrypt");

const hashPasswordForUser = async (password) =>
  await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

const comparePasswordWithHash = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = { hashPasswordForUser, comparePasswordWithHash };
