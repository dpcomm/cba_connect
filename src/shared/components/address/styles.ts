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

  searchRow: {
    paddingHorizontal: Layout.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
  },

  searchBtn: {
    height: 44,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnDisabled: {
    backgroundColor: Color.primary.hover,
    opacity: 0.6,
  },
  searchBtnPressed: {
    backgroundColor: Color.primary.pressed,
  },

  clearBtn: {
    height: 44,
    paddingHorizontal: Layout.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.l,
    gap: Layout.spacing.s,
  },

  item: {
    padding: Layout.spacing.s,
    borderRadius: Layout.radius.m,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    backgroundColor: Color.secondary.main,
  },
  itemPressed: {
    borderColor: Color.primary.hover,
  },

  empty: {
    paddingVertical: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
