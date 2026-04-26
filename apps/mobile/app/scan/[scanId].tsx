import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getScan } from "@/api/menu";
import { createDemoMenu } from "@/api/menu";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";

export default function ScanScreen() {
  const { scanId } = useLocalSearchParams<{ scanId: string }>();
  const scan = useQuery({
    queryKey: ["scan", scanId],
    queryFn: () => getScan(scanId),
    refetchInterval: (query) => query.state.data?.status === "processing" ? 1200 : false
  });

  useEffect(() => {
    if (scan.data?.status === "completed" && scan.data.menuId) {
      const timer = setTimeout(() => router.replace(`/menu/${scan.data?.menuId}`), 650);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [scan.data?.status, scan.data?.menuId]);

  return (
    <Screen>
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.title}>{scan.data?.status === "failed" ? "识别失败" : "AI 识别中"}</Text>
        <Text style={styles.sub}>{scan.data?.status === "failed" ? scan.data.errorMessage : "正在识别菜品、价格、bbox 热区和忌口风险。"}</Text>
        {scan.data?.status === "failed" ? (
          <>
            <PrimaryButton onPress={() => router.replace("/camera")}>重新拍摄</PrimaryButton>
            <PrimaryButton tone="light" onPress={async () => {
              const demo = await createDemoMenu();
              if (demo.menuId) router.replace(`/menu/${demo.menuId}`);
            }}>使用样例菜单继续演示</PrimaryButton>
          </>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900"
  },
  sub: {
    color: colors.muted,
    textAlign: "center",
    lineHeight: 22
  }
});
