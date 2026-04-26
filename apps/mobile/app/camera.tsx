import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Alert, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";
import { uploadMenuScan } from "@/api/menu";
import { useProfileStore } from "@/stores/profileStore";

export default function CameraScreen() {
  const profile = useProfileStore();
  const [loading, setLoading] = useState(false);

  const pick = async (mode: "camera" | "library") => {
    const permission = mode === "camera"
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("需要权限", "请允许访问相机或相册。");
      return;
    }

    const result = mode === "camera"
      ? await ImagePicker.launchCameraAsync({ quality: 0.86 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.86, mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (result.canceled) return;

    setLoading(true);
    try {
      const scan = await uploadMenuScan({
        uri: result.assets[0].uri,
        dietaryProfile: profile.dietaryProfile,
        targetLanguage: "zh-CN",
        countryCode: "JP"
      });
      router.replace(`/scan/${scan.scanId}`);
    } catch (error) {
      Alert.alert("上传失败", error instanceof Error ? error.message : "请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen bg="#0A0805">
      <View style={styles.frame}>
        <View style={styles.menuPaper}>
          <Text style={styles.jpTitle}>麺処 つばき</Text>
          {["豚骨ラーメン", "醤油ラーメン", "焼き餃子", "鶏の唐揚げ", "枝豆"].map((item, index) => (
            <View key={item} style={styles.menuRow}>
              <Text style={styles.jp}>{item}</Text>
              <Text style={styles.jp}>¥{[1180, 1080, 580, 780, 380][index]}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.tip}>将菜单完整放入框内，避免反光和倾斜。</Text>
      <View style={styles.actions}>
        <PrimaryButton tone="light" disabled={loading} onPress={() => pick("library")}>从相册选择</PrimaryButton>
        <PrimaryButton tone="accent" disabled={loading} onPress={() => pick("camera")}>{loading ? "识别中..." : "拍菜单"}</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  frame: {
    marginTop: 54,
    minHeight: 420,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)"
  },
  menuPaper: {
    width: 280,
    padding: 24,
    borderRadius: 4,
    backgroundColor: "#F0E4C8",
    transform: [{ rotate: "-2deg" }]
  },
  jpTitle: {
    marginBottom: 16,
    textAlign: "center",
    color: "#2A1A08",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 3
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8
  },
  jp: {
    color: "#2A1A08",
    fontSize: 14,
    fontWeight: "700"
  },
  tip: {
    marginTop: 20,
    textAlign: "center",
    color: "rgba(255,255,255,0.72)",
    lineHeight: 20
  },
  actions: {
    marginTop: "auto",
    gap: 12
  }
});
