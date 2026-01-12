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
  headerIcon: { color: Color.text.main },
  headerTitle: { color: Color.text.main, fontWeight: '800' },

  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl,
  },

  list: { gap: Layout.spacing.m },

  card: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },

  dateRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.s },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Color.secondary.hover,
    borderWidth: 2,
    borderColor: Color.primary.main,
  },

  dateText: { color: Color.primary.main, fontWeight: '900' },

  roleBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.radius.l,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    backgroundColor: Color.secondary.main,
  },
  roleBadgeText: { color: Color.text.main, fontWeight: '800' },

  infoList: { gap: Layout.spacing.xs },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    width: 80,
    color: Color.text.sub,
    fontWeight: '700',
  },
  infoValue: {
    flex: 1,
    color: Color.text.main,
    fontWeight: '700',
  },
});
