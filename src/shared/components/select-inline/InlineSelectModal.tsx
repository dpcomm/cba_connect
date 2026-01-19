import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { styles } from './styles';

export type InlineOption = { label: string; value: string };

type Props = {
    visible: boolean;
    title: string;
    options: InlineOption[];
    selectedValue?: string;
    onClose: () => void;
    onSelect: (opt: InlineOption) => void;
};

export function InlineSelectModal({
    visible,
    title,
    options,
    selectedValue,
    onClose,
    onSelect,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            {/* bottom sheet */}
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: Color.secondary.main,
                    borderTopLeftRadius: Layout.radius.l,
                    borderTopRightRadius: Layout.radius.l,
                    paddingBottom: Layout.spacing.l,
                    ...Layout.shadow.drop,
                }}
            >
                {/* header */}
                <View
                    style={{
                        paddingHorizontal: Layout.spacing.l,
                        paddingTop: Layout.spacing.l,
                        paddingBottom: Layout.spacing.s,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <ThemedText variant="heading3" color={Color.text.main}>
                        {title}
                    </ThemedText>

                    <Pressable onPress={onClose} hitSlop={10}>
                        <ThemedText variant="text2" color={Color.text.sub}>
                            닫기
                        </ThemedText>
                    </Pressable>
                </View>

                <ScrollView
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="always"
                >
                    {options.map((opt) => {
                        const active = opt.value === selectedValue;
                        return (
                            <Pressable
                                key={opt.value}
                                onPress={() => {
                                    onSelect(opt);
                                    onClose();
                                }}
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

// StyleSheet import 누락 방지

