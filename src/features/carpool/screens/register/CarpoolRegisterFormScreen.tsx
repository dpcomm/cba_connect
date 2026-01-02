import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { styles } from './formStyles';
import { useCarpoolRegisterFormViewModel } from './useCarpoolRegisterFormViewModel';

export default function CarpoolRegisterFormScreen() {
  const {
    destination,
    isHomeDestination,
    driverName,
    setDriverName,
    carInfo,
    setCarInfo,
    capacity,
    decCapacity,
    incCapacity,
    dateText,
    openDatePicker,
    hour,
    setHour,
    minute,
    setMinute,
    phone,
    setPhone,
    fromPlace,
    setFromPlace,
    toPlace,
    setToPlace,
    mainPickup,
    setMainPickup,
    memo,
    setMemo,
    goBack,
    submit,
  } = useCarpoolRegisterFormViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.headerSide} hitSlop={10}>
          <ThemedText variant="heading3" style={{ color: Color.text.main }}>
            ←
          </ThemedText>
        </Pressable>

        <ThemedText variant="heading3" style={styles.headerTitle}>
          카풀 등록
        </ThemedText>

        <View style={styles.headerSide} />
      </View>

      <View style={styles.content}>
        {/* 운전자명 */}
        <ThemedText variant="text3" style={styles.label}>운전자명</ThemedText>
        <TextInput
          style={styles.input}
          value={driverName}
          onChangeText={setDriverName}
          placeholder="김OO (DB 자동입력/수정 가능)"
          placeholderTextColor={Color.text.disabled}
        />

        {/* 내 차 정보 */}
        <ThemedText variant="text3" style={styles.label}>내 차 정보(차종/색깔/번호)</ThemedText>
        <TextInput
          style={styles.input}
          value={carInfo}
          onChangeText={setCarInfo}
          placeholder="셀토스/흰색/00가0000"
          placeholderTextColor={Color.text.disabled}
        />

        {/* 수용 가능 인원 */}
        <ThemedText variant="text3" style={styles.label}>수용 가능한 인원</ThemedText>
        <View style={styles.stepperRow}>
          <Pressable onPress={decCapacity} style={styles.stepperBtnLeft} hitSlop={10}>
            <ThemedText variant="heading3" style={styles.stepperBtnText}>-</ThemedText>
          </Pressable>
          <View style={styles.stepperValue}>
            <ThemedText variant="text2" style={styles.stepperValueText}>{capacity}</ThemedText>
          </View>
          <Pressable onPress={incCapacity} style={styles.stepperBtnRight} hitSlop={10}>
            <ThemedText variant="heading3" style={styles.stepperBtnText}>+</ThemedText>
          </Pressable>
        </View>

        {/* 날짜/시간 */}
        <View style={styles.row2}>
  <View style={{ flex: 1 }}>
    <ThemedText variant="text3" style={styles.label}>날짜</ThemedText>

    {isHomeDestination ? (
      // ✅ HOME: 고정(읽기 전용)
      <View style={styles.readonlyBox}>
        <ThemedText variant="text3" style={styles.readonlyText}>
          {dateText}
        </ThemedText>
      </View>
    ) : (
      // ✅ RETREAT: 선택 가능(Pressable)
      <Pressable onPress={openDatePicker} style={styles.selectBox} hitSlop={10}>
        <ThemedText variant="text3" style={styles.selectBoxText}>
          {dateText}
        </ThemedText>
      </Pressable>
    )}
  </View>

  <View style={{ width: 10 }} />

  {/* ✅ HOME이 아니면 시간 선택 가능 */}
  {!isHomeDestination && (
    <View style={{ width: 110 }}>
      <ThemedText variant="text3" style={styles.label}>시간</ThemedText>
      <View style={styles.timeRow}>
        <TextInput
          style={styles.timeInput}
          value={hour}
          onChangeText={setHour}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="00"
          placeholderTextColor={Color.text.disabled}
        />
        <ThemedText variant="text3" style={styles.timeUnit}>시</ThemedText>
        <TextInput
          style={styles.timeInput}
          value={minute}
          onChangeText={setMinute}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="00"
          placeholderTextColor={Color.text.disabled}
        />
        <ThemedText variant="text3" style={styles.timeUnit}>분</ThemedText>
      </View>
    </View>
  )}
</View>

        {/* 연락처 */}
        <ThemedText variant="text3" style={styles.label}>연락처</ThemedText>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="010-0000-0000 (DB 자동입력/수정 가능)"
          placeholderTextColor={Color.text.disabled}
          keyboardType="phone-pad"
        />

        {/* 출발지(픽업위치) */}
        <ThemedText variant="text3" style={styles.label}>출발지 (픽업위치)</ThemedText>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            value={fromPlace}
            placeholder={destination === 'RETREAT' ? '수련회장' : '집으로'}
            placeholderTextColor={Color.text.disabled}
          />
          <ThemedText variant="text3" style={styles.searchIcon}>🔍</ThemedText>
        </View>

        {/* 도착지 */}
        <ThemedText variant="text3" style={styles.label}>도착지</ThemedText>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            value={toPlace}
            onChangeText={setToPlace}
            placeholder="영등포 307"
            placeholderTextColor={Color.text.disabled}
          />
          <ThemedText variant="text3" style={styles.searchIcon}>🔍</ThemedText>
        </View>

        {/* 지도 (빈칸) */}
        <View style={styles.mapBox}>
          <ThemedText variant="text3" style={styles.mapText}>픽업 장소 선택</ThemedText>
          <ThemedText variant="text3" style={styles.mapSubText}>
            지도는 추후 연동 예정
          </ThemedText>
        </View>

        {/* 주요 위치 */}
        <ThemedText variant="text3" style={styles.label}>주요 위치</ThemedText>
        <TextInput
          style={styles.input}
          value={mainPickup}
          onChangeText={setMainPickup}
          placeholder="신도림역 1번 출구 앞"
          placeholderTextColor={Color.text.disabled}
        />

        {/* 메모 */}
        <ThemedText variant="text3" style={styles.label}>메모</ThemedText>
        <TextInput
          style={[styles.input, styles.memoInput]}
          value={memo}
          onChangeText={setMemo}
          placeholder="시간 엄수, 커피 사주시면 감사, 도착하면 전화주세요 등"
          placeholderTextColor={Color.text.disabled}
          multiline
        />

        {/* 등록하기 버튼 */}
        <Pressable onPress={submit} style={styles.submitBtn} hitSlop={10}>
          <ThemedText variant="text2" style={styles.submitText}>등록하기</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
