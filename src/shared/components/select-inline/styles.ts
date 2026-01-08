import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,               // ✅ 앵커 너비와 동일 (3번)
    marginTop: 0,           // ✅ 박스 바로 아래 딱 붙게 (1번)
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.m,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    overflow: 'hidden',
    zIndex: 60,
    ...Layout.shadow.drop,
  },

  item: {
    height: 40,
    paddingHorizontal: Layout.spacing.s,
    justifyContent: 'center',
  },
  itemPressed: { backgroundColor: Color.secondary.hover },
  itemActive: { backgroundColor: Color.primary.hover },
});
