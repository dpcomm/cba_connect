import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },

  listContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },

  card: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.l,
    ...Layout.shadow.default,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },

  leftIcon: {
    marginRight: Layout.spacing.s,
  },

  dateText: {
    color: Color.primary.main,
    flex: 1,
  },

  roleChip: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Color.text.main,
    backgroundColor: Color.secondary.main,
  },

  roleChipText: {
    color: Color.text.main,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.s,
  },

  label: {
    width: 90,
    color: Color.text.main,
  },

  value: {
    flex: 1,
    color: Color.text.sub,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.l,
  },

  emptyCard: {
    backgroundColor: Color.secondary.hover, // 연한 회색 계열
    borderRadius: Layout.radius.l,
    paddingVertical: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.l,
    alignItems: 'center',
    ...Layout.shadow.default,
  },

  emptyText: {
    color: Color.text.main,
  },

});
