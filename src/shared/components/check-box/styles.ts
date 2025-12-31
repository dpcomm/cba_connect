import { Color } from '@shared/constants/color';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Color.secondary.pressed,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checked: {
    backgroundColor: Color.primary.main,
    borderColor: Color.primary.main,
  },

  disabled: {
    opacity: 0.5,
  },
});
