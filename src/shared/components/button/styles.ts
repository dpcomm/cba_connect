import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.radius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sizes
  small: {
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: Layout.spacing.m,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: Layout.spacing.l,
  },
  // Text Sizes
  textsmall: Font.text4,
  textmedium: Font.text2,
  textlarge: Font.text1,

  // Variant: Primary
  primary: {
    backgroundColor: Color.primary.main,
  },
  primaryPressed: {
    backgroundColor: Color.primary.pressed,
  },
  textprimary: {
    color: Color.secondary.main,
  },

  // Variant: Secondary
  secondary: {
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.default.background,
  },
  secondaryPressed: {
    backgroundColor: Color.tertiary.hover,
  },
  textsecondary: {
    color: Color.text.main,
  },

  // Variant: Tertiary (Text only / Transparent)
  tertiary: {
    backgroundColor: 'transparent',
  },
  tertiaryPressed: {
    backgroundColor: Color.tertiary.hover,
  },
  texttertiary: {
    color: Color.text.sub,
  },

  // State: Disabled
  disabled: {
    backgroundColor: Color.text.disabled,
    opacity: 0.5,
  },
  text: {},
  textDisabled: {
    color: Color.text.disabled,
  },
});