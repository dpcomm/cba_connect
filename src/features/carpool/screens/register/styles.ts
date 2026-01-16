import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 700,
    textAlign: 'center',
    color: Color.text.main,
  },

  card: {
    height: 200,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow.default,
  },

  cardActive: {
    backgroundColor: Color.primary.main,
  },

  cardText: {
    marginTop: Layout.spacing.xs,
    color: Color.text.main,
  },

  cardTextActive: {
    color: Color.text.white,
  },

  icon: {
    fontSize: 48,
    lineHeight: 56,
  },
});
