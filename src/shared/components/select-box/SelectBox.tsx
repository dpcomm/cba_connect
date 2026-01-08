import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface SelectBoxProps {
  label?: string;
  value: string;
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  right?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function SelectBox({
  label,
  value,
  placeholder = '선택',
  onPress,
  disabled = false,
  right,
  containerStyle,
}: SelectBoxProps) {
  const displayText = value?.trim() ? value : placeholder;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {!!label && (
        <ThemedText variant="text3" color={Color.text.main} style={styles.label}>
          {label}
        </ThemedText>
      )}

      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.box,
          disabled && styles.boxDisabled,
          pressed && !disabled && styles.boxPressed,
        ]}
        hitSlop={10}
      >
        <ThemedText
          variant="text2"
          color={value?.trim() ? Color.text.main : Color.text.disabled}
          style={styles.value}
          numberOfLines={1}
        >
          {displayText}
        </ThemedText>

        {right ?? (
          <ThemedText variant="text2" color={disabled ? Color.text.disabled : Color.text.sub}>
            ▾
          </ThemedText>
        )}
      </Pressable>
    </View>
  );
}
