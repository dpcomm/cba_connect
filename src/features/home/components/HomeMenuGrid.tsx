import React from "react";
import { Dimensions, View } from "react-native";
import CarpoolIcon from "../../../../assets/svgs/carpool.svg";
import CheckInIcon from "../../../../assets/svgs/check-in.svg";
import GuidebookIcon from "../../../../assets/svgs/guidebook.svg";
import LectureIcon from "../../../../assets/svgs/lecture.svg";
import RetreatIcon from "../../../../assets/svgs/retreat-application.svg";
import YoutubeIcon from "../../../../assets/svgs/youtube.svg";
import { MenuCard } from "./MenuCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const CARD_GAP = 12;

const LARGE_CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;
const LARGE_CARD_HEIGHT = LARGE_CARD_WIDTH * 0.89;
const SMALL_CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP * 2) / 3;
const SMALL_CARD_HEIGHT = SMALL_CARD_WIDTH * 0.83;

interface HomeMenuGridProps {
  isRetreatRegistered?: boolean;
  onRetreatPress?: () => void;
  onCarpoolPress?: () => void;
  onGuidebookPress?: () => void;
  onVideoPress?: () => void;
  onLecturePress?: () => void;
}

export function HomeMenuGrid({
  isRetreatRegistered = false,
  onRetreatPress,
  onCarpoolPress,
  onGuidebookPress,
  onVideoPress,
  onLecturePress,
}: HomeMenuGridProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          gap: CARD_GAP,
          marginBottom: CARD_GAP,
        }}
      >
        <MenuCard
          title={isRetreatRegistered ? "수련회 등록" : "수련회 신청"}
          description={
            isRetreatRegistered
              ? "현장 체크인은\n여기서!"
              : "2026 겨울 수련회\n'바라봄'"
          }
          size="large"
          onPress={onRetreatPress}
          style={{ width: LARGE_CARD_WIDTH, height: LARGE_CARD_HEIGHT }}
          icon={isRetreatRegistered ? <CheckInIcon /> : <RetreatIcon />}
        />
        <MenuCard
          title="카풀 서비스"
          description={"혼자 말고,\n같이 가요!"}
          size="large"
          onPress={onCarpoolPress}
          style={{ width: LARGE_CARD_WIDTH, height: LARGE_CARD_HEIGHT }}
          icon={<CarpoolIcon />}
        />
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          gap: CARD_GAP,
        }}
      >
        <MenuCard
          title="가이드북"
          size="small"
          onPress={onGuidebookPress}
          style={{ width: SMALL_CARD_WIDTH, height: SMALL_CARD_HEIGHT }}
          icon={<GuidebookIcon />}
        />
        <MenuCard
          title="영상 자료실"
          size="small"
          onPress={onVideoPress}
          style={{ width: SMALL_CARD_WIDTH, height: SMALL_CARD_HEIGHT }}
          icon={<YoutubeIcon />}
        />
        <MenuCard
          title="선택식 강의"
          size="small"
          onPress={onLecturePress}
          style={{ width: SMALL_CARD_WIDTH, height: SMALL_CARD_HEIGHT }}
          icon={<LectureIcon />}
        />
      </View>
    </View>
  );
}
