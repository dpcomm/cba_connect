import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: Layout.spacing.xs,
  },
  label: {
    marginTop: Layout.spacing.s,
  },

  box: {
    height: 44,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    paddingHorizontal: Layout.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxPressed: {
    borderColor: Color.primary.hover,
  },
  boxDisabled: {
    backgroundColor: Color.secondary.hover,
    borderColor: Color.secondary.pressed,
    opacity: 0.7,
  },

  value: {
    flex: 1,
    paddingRight: Layout.spacing.s,
  },
});
