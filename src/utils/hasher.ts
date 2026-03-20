import bcrypt from "bcryptjs";
const hasher = async (password: string) => {
  const saltRounds = 10;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const hashedPassword = (await bcrypt.hash(password, saltRounds)) as string;
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default hasher;
