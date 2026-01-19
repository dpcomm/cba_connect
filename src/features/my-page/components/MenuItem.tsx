import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import VectorRight from '../../../../assets/svgs/vector-right.svg';

interface MenuItemProps {
  label: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showBorder?: boolean;
  style?: ViewStyle;
}

export function MenuItem({ label, onPress, rightElement, showBorder = true, style }: MenuItemProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderBottomWidth: showBorder ? 1 : 0,
          borderBottomColor: Color.default.background,
        },
        style
      ]}
    >
      <ThemedText variant="heading3" color={Color.text.main}>
        {label}
      </ThemedText>
      <View>
        {rightElement}
        <VectorRight width={24} height={24} />
      </View>
    </TouchableOpacity>
  );
}
