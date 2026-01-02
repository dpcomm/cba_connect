import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

type Destination = 'HOME' | 'RETREAT';

export function useCarpoolRegisterFormViewModel() {
  const router = useRouter();
  const params = useLocalSearchParams<{ destination?: Destination }>();
  const destination: Destination = (params.destination as Destination) ?? 'RETREAT';

  const isHomeDestination = destination === 'HOME';

  // ✅ 날짜: HOME이면 고정, 아니면 선택 가능(상태)
  const fixedDateText = '2025-07-13 (고정)'; // TODO: 서버/기획 값으로 교체
  const [dateText, setDateText] = useState(isHomeDestination ? fixedDateText : '날짜 선택');

  // ✅ 시간: HOME이 아니면 선택 가능
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  // 기타 폼 상태들 (기존 그대로)
  const [driverName, setDriverName] = useState('');
  const [carInfo, setCarInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [fromPlace, setFromPlace] = useState(isHomeDestination ? '수련회장' : '집으로'); // 너 로직에 맞게 조정 가능
  const [toPlace, setToPlace] = useState('');
  const [mainPickup, setMainPickup] = useState('');
  const [memo, setMemo] = useState('');

  const incCapacity = () => setCapacity((v) => Math.min(8, v + 1));
  const decCapacity = () => setCapacity((v) => Math.max(1, v - 1));

  const goBack = () => router.back();

  // ✅ 날짜 선택 핸들러(일단 UI는 스텁)
  const openDatePicker = () => {
    if (isHomeDestination) return; // HOME이면 막기
    // TODO: Date picker 붙이면 여기서 setDateText(...)
    // 임시: 클릭하면 샘플로 바뀌게
    setDateText('2025-07-20');
  };

  // ✅ 시간 선택 핸들러(일단 UI는 입력이라 그대로)
  // HOME일 때 시간도 고정해야 한다면 여기서 막으면 됨.

  const submit = async () => {
    // HOME일 경우 dateText는 fixedDateText 유지
    // RETREAT일 경우 dateText/hour/minute가 사용자가 선택한 값

    // TODO: 등록 API 호출
    router.replace('/carpool');
  };

  return {
    destination,
    isHomeDestination,

    driverName, setDriverName,
    carInfo, setCarInfo,
    phone, setPhone,

    capacity, incCapacity, decCapacity,

    dateText,
    openDatePicker,

    hour, setHour,
    minute, setMinute,

    fromPlace, setFromPlace,
    toPlace, setToPlace,
    mainPickup, setMainPickup,
    memo, setMemo,

    goBack,
    submit,
  };
}
