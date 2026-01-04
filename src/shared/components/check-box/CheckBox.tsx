import { Color } from '@shared/constants/color';
import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function CheckBox({
  checked,
  onPress,
  disabled = false,
  style,
}: CheckBoxProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}
    >
      <View style={[styles.checkbox, checked && styles.checked]}>
        <View
          style={{
            width: 12,
            height: 6,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderColor: checked ? Color.text.white : Color.secondary.pressed,
            transform: [{ rotate: '-45deg' }, { translateY: -1 }],
          }}
        />
      </View>
    </Pressable>
  );
}
