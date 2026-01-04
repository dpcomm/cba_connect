import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.l,
    justifyContent: 'center',
    backgroundColor: Color.default.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 21,
  },
  logoLight: {
    fontWeight: '300',
    color: Color.text.main,
  },
  logoBold: {
    fontSize: 48,
    lineHeight: 58,
    color: Color.text.main,
  },
  inputContainer: {
    marginBottom: Layout.spacing.l,
    gap: 11
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  optionText: {
    marginLeft: Layout.spacing.s,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 16,
    width: 0.5,
    backgroundColor: Color.text.main,
    marginHorizontal: 10,
  },
});
