import axios from "axios";
import Constants from "expo-constants";

const KAKAO_REST_API_KEY = Constants.expoConfig?.extra?.KAKAO_REST_API_KEY;

export type AddressResult = {
  address: string;
  lat: number;
  lng: number;
};

export async function searchAddresses(query: string): Promise<AddressResult[]> {
  const { data } = await axios.get(
    "https://dapi.kakao.com/v2/local/search/address.json",
    {
      params: { query, size: 15 },
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    },
  );

  return (data.documents ?? []).map((e: any) => ({
    address: e.address_name,
    lat: Number.parseFloat(e.y) || 0,
    lng: Number.parseFloat(e.x) || 0,
  }));
}
