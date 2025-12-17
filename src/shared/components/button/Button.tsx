import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles[`${variant}Pressed`],
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text${size}`],
          styles[`text${variant}`],
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
