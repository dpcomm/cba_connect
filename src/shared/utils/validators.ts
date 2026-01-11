/**
 * 이메일 검증
 * @param email
 * @returns
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 휴대폰 번호 검증
 * @param phone
 * @returns
 */
export function isValidPhone(phone: string): boolean {
  // 10-11자리 숫자
  return /^\d{10,11}$/.test(phone);
}

/**
 * 비밀번호 검증
 * @param password
 * @returns
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}
