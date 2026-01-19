import { CheckBox } from "@shared/components/check-box/CheckBox";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import React from "react";
import { ScrollView, View } from "react-native";

interface Props {
  agreed: boolean;
  setAgreed: (agreed: boolean) => void;
}

export function TermsStep({ agreed, setAgreed }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="heading3" style={{ textAlign: "center" }}>
          [필수] 개인정보 수집 이용 동의
        </ThemedText>
      </View>

      <View
        style={{
          height: 220,
          borderWidth: 1,
          borderColor: Color.secondary.pressed,
          borderRadius: Layout.radius.m,
          padding: Layout.spacing.m,
          backgroundColor: Color.secondary.main,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={true}>
          <ThemedText
            variant="text2"
            color={Color.text.sub}
            style={{ lineHeight: 20 }}
          >
            본 동의서는 CBA Connect 이용과 관련하여 귀하의 개인정보를
            수집·이용하기 위해 마련되었습니다. 귀하께서는 본 동의서를 자세히
            읽고 내용을 충분히 이해하신 후, 동의 여부를 결정하여 주시기
            바랍니다.
            {"\n\n"}
            1. 개인정보의 수집·이용 목적{"\n"}- 카풀 매칭 및 운행: 운전자와
            동승자의 원활한 매칭, 경로 안내, 탑승 위치 확인{"\n"}- 회원 관리:
            본인 확인, 소속(공동체) 확인, 서비스 이용 자격 관리{"\n"}- 의사소통:
            서비스 관련 알림 발송, 매칭 시 상호 연락{"\n\n"}
            2. 수집하는 개인정보 항목{"\n"}
            귀하는 동의를 거부할 권리가 있으나, 필수 항목 미동의 시 서비스
            이용이 제한될 수 있습니다.{"\n"}
            [필수 항목]{"\n"}- 회원 가입 및 관리: 아이디, 비밀번호, 이름,
            전화번호, 소속 정보 (중그룹, 교회명 등 공동체 식별 정보){"\n"}- 카풀
            운전자 등록 시: 차량 정보(차종, 차량 색상, 차량번호, 탑승 가능
            인원), 운행 정보(출발/도착지 주소 및 좌표 정보, 출발 시간, 주요 픽업
            위치, 운행 메모){"\n"}
            [선택 항목]{"\n"}- 푸시 알림 수신 동의 여부{"\n"}- 백그라운드 위치
            추적 동의 여부{"\n"}- 생년월일, 성별{"\n\n"}
            3. 개인정보의 보유 및 이용기간{"\n"}- 원칙: 회원 탈퇴 시 즉시 파기
            (단, 부정이용 방지를 위해 내부 방침에 따라 일정 기간 보관할 수 있음)
            {"\n"}- 카풀 운행 기록: 서비스 품질 관리 및 분쟁 해결을 위해 운행
            종료 후 1년간 보관{"\n\n"}
            4. 동의를 거부할 권리 및 불이익{"\n"}- 귀하는 동의를 거부할 권리가
            있습니다. 필수 항목 미동의 시 서비스 이용이 제한될 수 있습니다.
            {"\n\n"}
            서비스명: CBA Connect{"\n"}
            현행 시행일자: 2026년 1월 19일{"\n"}
            최초 시행일자: 2025년 6월 22일{"\n"}
            Copyright © 2026 CBA Connect. All rights reserved.
          </ThemedText>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: Layout.spacing.l,
        }}
      >
        <CheckBox checked={agreed} onPress={() => setAgreed(!agreed)} />
        <ThemedText
          variant="heading3"
          style={{ marginLeft: Layout.spacing.s }}
          onPress={() => setAgreed(!agreed)}
        >
          동의합니다.
        </ThemedText>
      </View>
    </View>
  );
}
