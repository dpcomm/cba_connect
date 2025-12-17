import { letterSpacingFromPercent } from "@shared/utils/letterSpacingFromPercent";

export const Font = {
  heading1: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    lineHeight: 38,
    letterSpacing: letterSpacingFromPercent(28, -2),
  },
  heading2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: letterSpacingFromPercent(24, -2),
  },
  heading3: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: letterSpacingFromPercent(20, -2),
  },
  text1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    lineHeight: 29,
    letterSpacing: letterSpacingFromPercent(16, -2),
  },
  text2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: letterSpacingFromPercent(14, -2),
  },
  text3: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: letterSpacingFromPercent(14, -2),
  },
  text4: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: letterSpacingFromPercent(12, -2),
  },
  text5: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: letterSpacingFromPercent(10, -2),
  },
  text6: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: letterSpacingFromPercent(10, -2),
  }
};
