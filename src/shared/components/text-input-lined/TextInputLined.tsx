import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
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
  rightIcon?: React.ReactNode;
}

export function TextInputLined({
  label,
  containerStyle,
  placeholderTextColor = Color.text.disabled,
  rightIcon,
  ...props
}: TextInputLinedProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      {label && (
        <ThemedText variant="text1" color={Color.text.sub} style={{ marginBottom: 10 }}>
          {label}
        </ThemedText>
      )}
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2, 
        borderBottomColor: isFocused ? Color.primary.main : Color.tertiary.main,
        paddingBottom: 4,
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
            flex: 1,
            height: 40,
            textAlignVertical: 'center',
            includeFontPadding: false,
            paddingVertical: 0,
          }}
          {...props}
        />
        {rightIcon}
      </View>
    </View>
  );
}
