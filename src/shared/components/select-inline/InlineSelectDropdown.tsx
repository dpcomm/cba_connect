import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { Pressable, ScrollView, View, ViewStyle } from 'react-native';
import { styles } from './styles';

export type InlineOption = { label: string; value: string };

export interface InlineSelectDropdownProps {
  visible: boolean;
  options: InlineOption[];
  selectedValue?: string;
  onSelect: (opt: InlineOption) => void;
  style?: ViewStyle;
}

export function InlineSelectDropdown({
  visible,
  options,
  selectedValue,
  onSelect,
  style,
}: InlineSelectDropdownProps) {
  if (!visible) return null;

  return (
    <View style={[styles.dropdown, style]}>
      <ScrollView
        nestedScrollEnabled
        style={{ maxHeight: 220 }}
        contentContainerStyle={{ paddingVertical: Layout.spacing.xs }}
        keyboardShouldPersistTaps="handled"
      >
        {options.map((opt) => {
          const active = opt.value === selectedValue;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onSelect(opt)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
                active && styles.itemActive,
              ]}
            >
              <ThemedText
                variant="text2"
                color={active ? Color.primary.main : Color.text.main}
              >
                {opt.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
