const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[a-zA-Z0-9._-]{3,}$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validePassword = (password: string): boolean => {
  return passwordRegex.test(password);
};

export const valideName = (name: string): boolean => {
  return nameRegex.test(name);
};
