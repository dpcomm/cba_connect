import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    padding: Layout.spacing.l,
    position: 'relative',
  },

  directionChip: {
    position: 'absolute',
    top: Layout.spacing.m,
    right: Layout.spacing.m,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Color.text.main,
    backgroundColor: 'transparent',
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.m,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapWrap: {
    marginTop: Layout.spacing.m,
    height: 160,
    borderRadius: Layout.radius.m,
    overflow: 'hidden',
  },

  map: { flex: 1 },

  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.default.background,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.m,
    marginTop: Layout.spacing.m,
  },

  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color.secondary.hover,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoTextCol: { flex: 1 },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.l,
    backgroundColor: Color.default.background,
  },

  bottomButton: {
    width: '100%',
  },

  bottomButtonRow: {
    flexDirection: 'row',
    gap: Layout.spacing.m,
  },

  bottomButtonHalf: {
    flex: 1,
  },

  deleteButtonHalf: {
    flex: 1,
    backgroundColor: Color.secondary.pressed,
  },

  /* ---------- 탑승자 목록 ---------- */
  passengerBox: {
    marginTop: Layout.spacing.xs,
    marginLeft: 32 + Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: 6,
    backgroundColor: Color.default.background,
  },

  passengerList: {
    gap: Layout.spacing.s,
  },

  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  passengerBullet: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Color.text.main,
    marginRight: Layout.spacing.s,
    marginTop: 4,
  },

  passengerNamePhone: {
    color: Color.text.main,
    flex: 1,
  },

  passengerCallBtn: {
    marginLeft: Layout.spacing.s,
    padding: 2,
  },

});
