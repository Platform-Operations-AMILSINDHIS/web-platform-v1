const bcrypt = require("bcrypt");
const hasher = async (password: string) => {
  const saltRounds = 10;
  try {
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default hasher;
