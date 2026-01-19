import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { styles } from './modalStyles';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectModalProps {
  visible: boolean;
  title: string;
  options: SelectOption[];
  selectedValue?: string;
  onClose: () => void;
  onSelect: (opt: SelectOption) => void;
}

export function SelectModal({
  visible,
  title,
  options,
  selectedValue,
  onClose,
  onSelect,
}: SelectModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <ThemedText variant="heading3" color={Color.text.main}>
            {title}
          </ThemedText>

          <Pressable onPress={onClose} hitSlop={10}>
            <ThemedText variant="text2" color={Color.text.sub}>
              닫기
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {options.map((opt) => {
            const active = opt.value === selectedValue;
            return (
              <Pressable
                key={opt.value}
                onPress={() => onSelect(opt)}
                style={({ pressed }) => [
                  styles.item,
                  active && styles.itemActive,
                  pressed && styles.itemPressed,
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
    </Modal>
  );
}
