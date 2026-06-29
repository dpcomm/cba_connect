import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  segmentWrap: {
    marginTop: Layout.spacing.xs,
    marginBottom: Layout.spacing.xs,
    flexDirection: 'row',
    gap: Layout.spacing.s,
  },

  segmentBtn: {
    paddingHorizontal: Layout.spacing.l,
    height: Layout.spacing.xl,
    borderRadius: Layout.radius.s,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.tertiary.main,
  },

  segmentBtnActive: {
    backgroundColor: Color.primary.main,
  },

  segmentText: {
    color: Color.text.white,
  },

  segmentTextActive: {
    color: Color.text.white,
  },

  /* ---------- List ---------- */
  listWrap: {
    marginTop: Layout.spacing.s,
    gap: Layout.spacing.s,
  },

  noticeCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    borderWidth: 1,
    borderColor: Color.secondary.main,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Layout.shadow.default,
  },

  noticeLeft: {
    flex: 1,
    paddingRight: Layout.spacing.s,
  },

  noticeAuthor: {
    color: Color.primary.main,
    marginBottom: Layout.spacing.xs,
  },
  noticeTitle: {
    color: Color.text.main,
  },
  noticeDate: {
    color: Color.text.sub,
  },

  chevron: {
    color: Color.text.sub,
  },

  /* ---------- Modal content (BaseModal children) ---------- */
  noticeModalWrapper: {
    marginTop: -Layout.spacing.m, // BaseModal 헤더 바로 아래
  },

  noticeCategoryText: {
    color: Color.primary.main,   // 보라색
    marginBottom: Layout.spacing.xs,
  },

  noticeModalTitle: {
    color: Color.text.main,
  },

  noticeModalContent: {
    marginTop: Layout.spacing.s,
    color: Color.text.main,
  },

  noticeModalDate: {
    marginTop: Layout.spacing.s,
    color: Color.text.sub,
  },

});
