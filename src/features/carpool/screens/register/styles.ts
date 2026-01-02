import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },

  /* Header */
  header: {
    height: 56,
    paddingHorizontal: Layout.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.secondary.main,
    ...Layout.shadow.default,
  },
  headerSide: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '800',
    color: Color.text.main,
  },

  /* Content */
  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.l,
  },

  title: {
    marginBottom: Layout.spacing.l,
    fontWeight: '800',
    color: Color.text.main,
  },

  card: {
    height: 140,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.l,
    ...Layout.shadow.default,
  },

  cardActive: {
    backgroundColor: Color.primary.main,
  },

  cardText: {
    marginTop: Layout.spacing.s,
    color: Color.text.main,
    fontWeight: '700',
  },

  cardTextActive: {
    color: Color.text.white,
  },
});
