export const getPasswordRequirements = (password: string) => [
  { text: 'At least 8 characters', met: password.length >= 8 },
  { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
  { text: 'Contains number', met: /\d/.test(password) },
];
