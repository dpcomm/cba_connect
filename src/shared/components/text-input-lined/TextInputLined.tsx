import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useState } from 'react';
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import { ThemedText } from '../themed-text/ThemedText';

export interface TextInputLinedProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  containerStyle?: ViewStyle;
}

export function TextInputLined({
  label,
  containerStyle,
  placeholderTextColor = Color.text.disabled,
  ...props
}: TextInputLinedProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      {label && (
        <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>
          {label}
        </ThemedText>
      )}
      <View style={{ 
        borderBottomWidth: 2, 
        borderBottomColor: isFocused ? Color.primary.main : Color.tertiary.main,
        paddingBottom: Layout.spacing.s,
      }}>
        <RNTextInput
          placeholderTextColor={placeholderTextColor}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          style={{
            ...Font.heading3,
            color: Color.text.main,
            padding: 0,
            width: '100%',
          }}
          {...props}
        />
      </View>
    </View>
  );
}
