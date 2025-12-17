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
    marginBottom: Layout.spacing.xxl,
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
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    borderRadius: Layout.radius.m,
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    fontSize: 16,
    color: Color.text.main,
    backgroundColor: Color.secondary.main,
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
    justifyContent: 'space-around',
  },
});
