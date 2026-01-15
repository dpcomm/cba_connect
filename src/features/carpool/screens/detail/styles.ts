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
  },
  headerSide: { width: 40, alignItems: 'center' },
  headerTitle: { flex: 1, textAlign: 'center' },

  content: {
    padding: Layout.spacing.l,
  },

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
});
