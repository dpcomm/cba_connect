import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },

  /* ---------- Header ---------- */
  header: {
    height: 56,
    paddingHorizontal: Layout.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.secondary.main,
    ...Layout.shadow.default,
  },
  headerSide: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    color: Color.text.main,
  },
  headerTitle: {
    color: Color.text.main,
    fontWeight: '800',
  },

  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },

  /* ---------- 신청내역 ---------- */
  section: {
    marginTop: Layout.spacing.m,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: Color.text.main,
    fontWeight: '800',
  },
  chevronBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  applicationList: {
    marginTop: Layout.spacing.s,
    gap: Layout.spacing.s,
  },
  applicationCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },
  applicationDriver: {
    color: Color.text.main,
    fontWeight: '800',
  },
  applicationDesc: {
    marginTop: Layout.spacing.xs,
    color: Color.primary.main,
    fontWeight: '700',
  },

  /* ---------- 집으로 / 수련회장 ---------- */
  segmentWrap: {
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.s,
    height: 36,
    borderRadius: Layout.radius.s,
    backgroundColor: Color.secondary.hover,
    padding: 3,
    flexDirection: 'row',
    gap: 6,
  },
  segmentBtn: {
    flex: 1,
    borderRadius: Layout.radius.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: Color.secondary.main,
  },
  segmentText: {
    color: Color.text.sub,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: Color.text.main,
  },

  /* ---------- 카풀 찾기 ---------- */
  findHeader: {
    marginTop: Layout.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  findTitle: {
    color: Color.text.main,
    fontWeight: '900',
  },

  pillBtn: {
    height: 28,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBtnText: {
    color: Color.text.main,
    fontWeight: '800',
  },

  searchInput: {
    marginTop: Layout.spacing.s,
    height: 40,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    paddingHorizontal: Layout.spacing.s,
    fontSize: 12,
    color: Color.text.main,
  },

  /* ---------- 모집글 리스트 ---------- */
  postList: {
    marginTop: Layout.spacing.m,
    gap: Layout.spacing.s,
  },

  postCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },

  postTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Color.secondary.hover,
    marginRight: Layout.spacing.s,
  },
  postName: {
    color: Color.text.main,
    fontWeight: '800',
  },

  statusBtnApply: {
    height: 28,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.radius.s,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextApply: {
    color: Color.text.white,
    fontWeight: '800',
  },

  statusBtnClosed: {
    height: 28,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.radius.s,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextClosed: {
    color: Color.text.sub,
    fontWeight: '800',
  },

  postInfo: {
    marginTop: Layout.spacing.s,
    gap: Layout.spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  infoValue: {
    color: Color.text.main,
    fontWeight: '700',
  },

  routeRow: {
    marginTop: Layout.spacing.s,
  },
  routeText: {
    color: Color.text.main,
    fontWeight: '700',
  },
});
