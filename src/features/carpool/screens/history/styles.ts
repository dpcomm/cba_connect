import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    margin: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.m,
    ...Layout.shadow.default,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },

  roleIconWrap: {
    marginRight: Layout.spacing.s,
  },

  dateText: {
    color: Color.primary.main,
    flex: 1,
  },

  statusChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },

  label: {
    width: 90,
    color: Color.text.main,
  },

  value: {
    flex: 1,
    color: Color.text.sub,
  },

});
