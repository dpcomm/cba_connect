import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.secondary.main,
    borderTopLeftRadius: Layout.radius.l,
    borderTopRightRadius: Layout.radius.l,
    paddingBottom: Layout.spacing.l,
    ...Layout.shadow.drop,
  },

  header: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.l,
    paddingBottom: Layout.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  list: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
    gap: Layout.spacing.xs,
  },

  item: {
    height: 44,
    borderRadius: Layout.radius.m,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    paddingHorizontal: Layout.spacing.s,
    justifyContent: 'center',
  },
  itemActive: {
    borderColor: Color.primary.main,
    backgroundColor: Color.primary.hover,
  },
  itemPressed: {
    opacity: 0.85,
  },
});
