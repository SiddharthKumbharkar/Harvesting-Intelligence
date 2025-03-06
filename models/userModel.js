const { authDB } = require('../config/db');

const createUser = async (name, email, hashedPassword, role) => {
  const result = await authDB.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await authDB.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail };
