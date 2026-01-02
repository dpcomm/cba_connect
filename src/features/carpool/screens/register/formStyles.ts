import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.default.background },

  header: {
    height: 56,
    paddingHorizontal: Layout.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.secondary.main,
    ...Layout.shadow.default,
  },
  headerSide: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: Color.text.main, fontWeight: '800' },

  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl,
    gap: Layout.spacing.s,
  },

  label: {
    color: Color.text.main,
    fontWeight: '800',
    marginTop: Layout.spacing.s,
  },

  input: {
    height: 44,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    paddingHorizontal: Layout.spacing.s,
    color: Color.text.main,
  },

  /* Stepper */
  stepperRow: {
    height: 36,
    borderRadius: Layout.radius.l,
    backgroundColor: Color.secondary.hover,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  stepperBtnLeft: {
    width: 44,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnRight: {
    width: 44,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: { color: Color.text.white, fontWeight: '900' },
  stepperValue: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  stepperValueText: { color: Color.text.main, fontWeight: '900' },

  /* Date/Time */
  row2: { flexDirection: 'row', alignItems: 'flex-end' },
  readonlyBox: {
    height: 44,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.tertiary.main, // 스샷처럼 회색 박스
    alignItems: 'center',
    justifyContent: 'center',
  },
  readonlyText: { color: Color.text.white, fontWeight: '800' },

  timeRow: {
    height: 44,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.xs,
    gap: Layout.spacing.xs,
  },
  timeInput: {
    width: 36,
    height: 32,
    borderRadius: Layout.radius.s,
    backgroundColor: Color.secondary.hover,
    textAlign: 'center',
    color: Color.text.main,
    fontWeight: '800',
  },
  timeUnit: { color: Color.text.main, fontWeight: '700' },
  selectBox: {
  height: 44,
  borderRadius: Layout.radius.m,
  backgroundColor: Color.secondary.main,
  borderWidth: 1,
  borderColor: Color.secondary.hover,
  alignItems: 'center',
  justifyContent: 'center',
},
selectBoxText: {
  color: Color.text.main,
  fontWeight: '800',
},

  /* Search box */
  searchBox: {
    height: 44,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.s,
  },
  searchInput: { flex: 1, color: Color.text.main },
  searchIcon: { color: Color.text.sub },

  /* Map placeholder */
  mapBox: {
    height: 150,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.s,
  },
  mapText: { color: Color.text.main, fontWeight: '900' },
  mapSubText: { marginTop: Layout.spacing.xs, color: Color.text.sub, fontWeight: '700' },

  memoInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: Layout.spacing.s,
  },

  submitBtn: {
    marginTop: Layout.spacing.l,
    height: 52,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow.default,
  },
  submitText: { color: Color.text.white, fontWeight: '900' },
});
