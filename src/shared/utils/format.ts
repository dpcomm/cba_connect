export const formatPhoneNumber = (value: string): string => {
  if (!value) return '';

  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 11자리 (010-1234-5678)
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  
  // 10자리 (011-123-4567 or 02-1234-5678)
  if (numbers.length === 10) {
    // 02로 시작하면 서울 전화번호 (02-1234-5678)
    if (numbers.startsWith('02')) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    // 그 외 (010-123-4567, 031-123-4567 -> 031-123-4567 is 10 digits? 031 is 3 digits. 123 is 3. 4567 is 4. Total 10.)
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  // 8자리 (1588-1234)
  if (numbers.length === 8) {
    return numbers.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  // 입력 중일 때 부분적으로 포맷팅 (UX를 위해)
  if (numbers.length < 4) return numbers;
  if (numbers.length < 7) {
    // 02-123, 010-123
    if (numbers.startsWith('02')) {
      return numbers.replace(/(\d{2})(\d{1,4})/, '$1-$2');
    }
    return numbers.replace(/(\d{3})(\d{1,3})/, '$1-$2');
  }
  // 010-1234-5...
  if (numbers.startsWith('02')) {
      return numbers.replace(/(\d{2})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
  }
  return numbers.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
};
