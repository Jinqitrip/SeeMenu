import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Chip } from "@/components/Chip";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";
import { useProfileStore } from "@/stores/profileStore";
import { joinRoom } from "@/api/room";
import { useCartStore } from "@/stores/cartStore";
import type { DietaryProfile } from "@/types/domain";

const allergyOptions = ["花生", "坚果", "海鲜", "乳制品", "鸡蛋", "小麦", "大豆"];
const lifestyleOptions = ["素食", "纯素", "不吃猪肉", "不吃牛肉", "低糖", "少辣"];

export default function HomeScreen() {
  const profile = useProfileStore();
  const cart = useCartStore();
  const [name, setName] = useState(profile.displayName);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [religion, setReligion] = useState("");
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    void profile.hydrate();
  }, []);

  useEffect(() => {
    setName(profile.displayName);
    setAllergies(profile.dietaryProfile.allergies);
    setReligion(profile.dietaryProfile.religion ?? "");
    setLifestyle(profile.dietaryProfile.lifestyle);
    setNotes(profile.dietaryProfile.notes);
  }, [profile.hydrated]);

  if (!profile.hydrated) {
    return <Screen><Text style={styles.muted}>加载中...</Text></Screen>;
  }

  const toggle = (value: string, current: string[], setter: (next: string[]) => void) => {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const saveProfile = async () => {
    const dietaryProfile: DietaryProfile = {
      allergies,
      religion: religion.trim() || null,
      lifestyle,
      notes: notes.trim()
    };
    await profile.save(name.trim() || "我", dietaryProfile);
  };

  if (!profile.onboarded) {
    return (
      <Screen>
        <View style={styles.logo}><Text style={styles.logoText}>看</Text></View>
        <Text style={styles.hero}>先告诉我你的忌口。</Text>
        <Text style={styles.sub}>SeeMenu 会把过敏原、宗教信仰和生活方式限制带入菜单识别和订单翻译。</Text>

        <Text style={styles.label}>昵称</Text>
        <TextInput value={name} onChangeText={setName} placeholder="我" style={styles.input} />

        <Text style={styles.label}>过敏原</Text>
        <View style={styles.chips}>{allergyOptions.map((item) => (
          <Chip key={item} label={item} selected={allergies.includes(item)} onPress={() => toggle(item, allergies, setAllergies)} />
        ))}</View>

        <Text style={styles.label}>宗教信仰或饮食规则</Text>
        <TextInput value={religion} onChangeText={setReligion} placeholder="例如：清真、犹太洁食、无" style={styles.input} />

        <Text style={styles.label}>生活方式忌口</Text>
        <View style={styles.chips}>{lifestyleOptions.map((item) => (
          <Chip key={item} label={item} selected={lifestyle.includes(item)} onPress={() => toggle(item, lifestyle, setLifestyle)} />
        ))}</View>

        <Text style={styles.label}>补充说明</Text>
        <TextInput value={notes} onChangeText={setNotes} placeholder="例如：不吃香菜，所有菜都少辣" style={[styles.input, styles.textarea]} multiline />

        <PrimaryButton tone="accent" onPress={saveProfile}>保存并开始</PrimaryButton>
      </Screen>
    );
  }

  const handleJoin = async () => {
    try {
      const result = await joinRoom({ joinCode, displayName: profile.displayName, dietaryProfile: profile.dietaryProfile });
      cart.setSession({ roomId: result.room.id, memberId: result.memberId, menuId: result.room.menuId });
      router.push(`/room/${result.room.id}`);
    } catch (error) {
      Alert.alert("加入失败", error instanceof Error ? error.message : "请检查房间码");
    }
  };

  return (
    <Screen>
      <View style={styles.topRow}>
        <View style={styles.logo}><Text style={styles.logoText}>看</Text></View>
        <View>
          <Text style={styles.brand}>SeeMenu</Text>
          <Text style={styles.muted}>智拍菜单</Text>
        </View>
      </View>
      <Text style={styles.hero}>看懂任何外文菜单。</Text>
      <Text style={styles.sub}>拍一张照，AI 帮你翻译、点单，并把你的忌口写成服务员能看懂的语言。</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>当前忌口资料</Text>
        <Text style={styles.cardText}>过敏：{profile.dietaryProfile.allergies.join("、") || "未填写"}</Text>
        <Text style={styles.cardText}>宗教/规则：{profile.dietaryProfile.religion || "未填写"}</Text>
        <Text style={styles.cardText}>生活方式：{profile.dietaryProfile.lifestyle.join("、") || "未填写"}</Text>
        <PrimaryButton tone="light" onPress={() => profile.reset()}>重新填写</PrimaryButton>
      </View>

      <PrimaryButton tone="accent" onPress={() => router.push("/camera")}>拍菜单</PrimaryButton>

      <View style={styles.joinCard}>
        <Text style={styles.cardTitle}>已加入朋友的菜单？</Text>
        <TextInput value={joinCode} onChangeText={setJoinCode} placeholder="输入房间码" autoCapitalize="characters" style={styles.input} />
        <PrimaryButton disabled={!joinCode.trim()} onPress={handleJoin}>加入房间</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 28
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  logoText: {
    color: colors.bg,
    fontWeight: "900"
  },
  brand: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16
  },
  hero: {
    marginTop: 36,
    color: colors.ink,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1
  },
  sub: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800"
  },
  input: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    backgroundColor: colors.bg2,
    color: colors.ink
  },
  textarea: {
    minHeight: 78,
    paddingTop: 12
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  card: {
    marginTop: 28,
    marginBottom: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.bg2,
    gap: 8
  },
  joinCard: {
    marginTop: 18,
    gap: 12
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  cardText: {
    color: colors.ink2,
    fontSize: 13
  },
  muted: {
    color: colors.muted
  }
});
