import { useRouter } from 'expo-router';
import { useState } from 'react';

type Destination = 'RETREAT' | 'HOME';

export function useCarpoolRegisterViewModel() {
  const router = useRouter();
  const [selected, setSelected] = useState<Destination | null>(null);

  const selectDestination = (value: Destination) => {
    setSelected(value);

    // 👉 다음 단계로 이동
    router.replace({
      pathname: '/carpool/register/form',
      params: { destination: value },
    });
  };

  return {
    selected,
    selectDestination,
  };
}
