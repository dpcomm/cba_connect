import { useLocalSearchParams } from "expo-router";
import { UpdateRequiredScreen } from "../src/features/update/UpdateRequiredScreen";

export default function UpdatePage() {
  const { currentVersion, latestVersion } = useLocalSearchParams<{
    currentVersion: string;
    latestVersion: string;
  }>();

  return (
    <UpdateRequiredScreen
      currentVersion={currentVersion ?? ""}
      latestVersion={latestVersion ?? ""}
    />
  );
}
