import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  },

  applicationList: {
    marginTop: Layout.spacing.s,
    gap: Layout.spacing.s,
  },

  applicationCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
  },

  applicationDriver: {
    color: Color.text.main,
    marginBottom: 4,
  },

  /* 시간 줄 */
  applicationDescRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  applicationBullet: {
    marginRight: Layout.spacing.s,
    color: Color.text.main,
  },
  applicationDateAccent: {
    color: Color.primary.main,
    lineHeight: 18,
    flexShrink: 1,
  },

  /* 경로 줄 */
  applicationRouteRow: {
    marginLeft: 14, // 불릿 정렬
  },
  applicationRouteText: {
    color: Color.text.main,
    lineHeight: 18,
    flexWrap: 'wrap',
  },

  emptyText: {
    color: Color.text.sub,
    textAlign: 'center',
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
  },

  pillBtn: {
    height: 28,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.tertiary.hover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBtnText: {
    color: Color.text.main,
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
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xs,
  },
  postTimeText: {
    color: Color.text.main,
  },
  postSeatText: {
    color: Color.primary.main,
  },
  postPlaceText: {
    color: Color.text.sub,
    marginBottom: 2,
  },
  postRouteText: {
    color: Color.text.main,
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
  },

  statusBtnApply: {
    height: 28,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextApply: {
    color: Color.text.white,
  },

  statusBtnClosed: {
    height: 28,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextClosed: {
    color: Color.text.sub,
  },
  postInfo: {
    marginTop: Layout.spacing.xs,
    gap: Layout.spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  infoValue: {
    color: Color.text.main,
  },
  routeRow: {
    marginTop: Layout.spacing.s,
  },
  routeText: {
    color: Color.text.main,
  },

  moreBtn: {
    paddingHorizontal: 14,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Color.tertiary.pressed,
    backgroundColor: Color.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnText: {
    color: Color.text.main,
  },
  kvRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  kvLabel: {
    width: 44,
    color: Color.text.main,
  },

  kvValue: {
    flex: 1,
    color: Color.text.sub,
    flexWrap: 'wrap',
  },
});
