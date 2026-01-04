import { Color } from '@shared/constants/color';
import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  error?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function TextInput({
  error = false,
  disabled = false,
  leftIcon,
  containerStyle,
  placeholderTextColor = Color.text.disabled,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focused,
        error && styles.error,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <RNTextInput
        style={styles.input}
        placeholderTextColor={placeholderTextColor}
        editable={!disabled}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    </View>
  );
}
