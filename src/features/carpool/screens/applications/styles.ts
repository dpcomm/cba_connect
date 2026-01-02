import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /* 공통 */
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
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
  headerIcon: { color: Color.text.main },
  headerTitle: { color: Color.text.main, fontWeight: '800' },
  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl,
  },

  /* 목록 전용 */
  list: { gap: Layout.spacing.s },
  listCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },
  listTitle: { color: Color.text.main, fontWeight: '800' },
  listDesc: { marginTop: Layout.spacing.xs, color: Color.primary.main, fontWeight: '700' },

  /* 상세 전용 */
  detailCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Color.secondary.hover,
  },
  profileName: {
    color: Color.text.main,
    fontWeight: '900',
  },
  profileSub: {
    marginTop: 2,
    color: Color.text.sub,
    fontWeight: '600',
  },

  mapStub: {
    height: 160,
    borderRadius: Layout.radius.s,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Layout.spacing.s,
  },
  mapStubText: {
    color: Color.text.sub,
    fontWeight: '700',
  },

  infoList: {
    marginTop: Layout.spacing.s,
    gap: Layout.spacing.s,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Layout.spacing.s,
  },
  infoIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoTextWrap: { flex: 1 },
  infoText: { color: Color.text.main, fontWeight: '700' },
  infoSubText: { marginTop: 2, color: Color.text.sub, fontWeight: '600' },

  bottomArea: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
  },
  bottomButton: {
    height: 52,
    borderRadius: Layout.radius.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.tertiary.main, // 스샷처럼 회색 버튼
  },
  bottomButtonText: {
    color: Color.text.white,
    fontWeight: '900',
  },
    // alias: ApplicationsScreen이 card/driver/desc를 쓰고 있어서 같이 지원
  card: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },
  driver: {
    color: Color.text.main,
    fontWeight: '800',
  },
  desc: {
    marginTop: Layout.spacing.xs,
    color: Color.primary.main,
    fontWeight: '700',
  },

});
