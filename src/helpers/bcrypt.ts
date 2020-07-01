import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const matchPassword = async (
  password: string,
  confirmPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, confirmPassword);
  } catch (err) {
    console.error(err);
    return false;
  }
};
