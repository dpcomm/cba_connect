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

  headerSide: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    maxHeight: 320,
  },

  listContent: {
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
  },

 item: {
  width: '100%',
  height: 44,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: Layout.spacing.l,
},

itemActive: {
  backgroundColor: Color.primary.hover,
},

itemPressed: {
  backgroundColor: Color.secondary.hover,
},

});
