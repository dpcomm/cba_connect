import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.default.background },

  header: {
    height: 56,
    paddingHorizontal: Layout.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.secondary.main,
    ...Layout.shadow.default,
  },
  headerSide: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: Color.text.main },

  content: {
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl,
    gap: Layout.spacing.m,
    zIndex: 1,
  },

  contentOnDropdown: {
    zIndex: 50,
    elevation: 50,
  },

  betweenActiveBlocks: {
    height: Layout.spacing.s,
  },
  activeBlockWrap: {
    marginTop: Layout.spacing.xs,
    gap: Layout.spacing.s,
  },

  fieldBlock: {
    width: '100%',
    gap: Layout.spacing.xs,
  },
  fieldLabel: {
    marginTop: 0,
  },

  dropdownDismissOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    elevation: 1,
  },

  stepperRow: {
    height: 44,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  stepperBtnLeft: {
    width: 56,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnRight: {
    width: 56,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ✅ (-) disabled 스타일 (4번)
  stepperBtnDisabled: {
    backgroundColor: Color.primary.hover,
    opacity: 0.6,
  },
  stepperBtnText: { color: Color.text.white },
  stepperValue: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  stepperValueText: { color: Color.text.main },

  // ✅ 날짜/시/분 비율 (50/25/25)
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Layout.spacing.s,
  },
  dateCol: { flex: 2 },
  timeCol: { flex: 1 },

  // ✅ 드롭다운이 박스 바로 아래 붙도록
  inlineAnchor: {
    position: 'relative',
    zIndex: 60, // dropdown이 위로 올라오도록
    elevation: 50,
  },

  // ✅ 지도 박스
  mapBox: {
    height: 180,
    borderRadius: Layout.radius.m,
    overflow: 'hidden',
    backgroundColor: Color.secondary.hover,
    ...Layout.shadow.default,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248,248,248,0.8)',
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'flex-end', // 텍스트 기준선 맞추기
    gap: Layout.spacing.xs,
  },

  helperText: {
    // 라벨보다 살짝 아래로 내려가게(스크린샷 느낌)
    marginBottom: 1,
  },

  memoContainer: {
    height: 90,
  },

  submitBtn: {
    marginTop: Layout.spacing.l,
    height: 52,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow.default,
  },
  submitText: { color: Color.text.white },

});
