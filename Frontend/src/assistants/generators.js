export function generateNumericAndUppercaseCode(length, prefix) {
  let result = prefix + "";
  const numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let counter = prefix.length;
  while (counter < length) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    counter += 1;
  }
  return result;
}

export function generatePassword(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?/";
  let result = "";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

export function generateNumericCode(length) {
  let result = "";
  const characters = "0123456789";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}
