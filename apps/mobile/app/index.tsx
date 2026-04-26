import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Chip } from "@/components/Chip";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";
import { createDemoMenu } from "@/api/menu";
import { useProfileStore } from "@/stores/profileStore";
import { joinRoom } from "@/api/room";
import { useCartStore } from "@/stores/cartStore";
import type { DietaryProfile } from "@/types/domain";
import { useHistoryStore } from "@/stores/historyStore";
import { TextField } from "@/components/TextField";
import { StateView } from "@/components/StateView";

const allergyOptions = ["花生", "坚果", "海鲜", "乳制品", "鸡蛋", "小麦", "大豆"];
const lifestyleOptions = ["素食", "纯素", "不吃猪肉", "不吃牛肉", "低糖", "少辣"];

export default function HomeScreen() {
  const profile = useProfileStore();
  const history = useHistoryStore();
  const cart = useCartStore();
  const [name, setName] = useState(profile.displayName);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [religion, setReligion] = useState("");
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    void profile.hydrate();
    void history.hydrate();
  }, []);

  useEffect(() => {
    setName(profile.displayName);
    setAllergies(profile.dietaryProfile.allergies);
    setReligion(profile.dietaryProfile.religion ?? "");
    setLifestyle(profile.dietaryProfile.lifestyle);
    setNotes(profile.dietaryProfile.notes);
  }, [profile.hydrated]);

  if (!profile.hydrated) {
    return <Screen scroll={false}><StateView title="加载中" loading /></Screen>;
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
        <TextField value={name} onChangeText={setName} placeholder="我" />

        <Text style={styles.label}>过敏原</Text>
        <View style={styles.chips}>{allergyOptions.map((item) => (
          <Chip key={item} label={item} selected={allergies.includes(item)} onPress={() => toggle(item, allergies, setAllergies)} />
        ))}</View>

        <Text style={styles.label}>宗教信仰或饮食规则</Text>
        <TextField value={religion} onChangeText={setReligion} placeholder="例如：清真、犹太洁食、无" />

        <Text style={styles.label}>生活方式忌口</Text>
        <View style={styles.chips}>{lifestyleOptions.map((item) => (
          <Chip key={item} label={item} selected={lifestyle.includes(item)} onPress={() => toggle(item, lifestyle, setLifestyle)} />
        ))}</View>

        <Text style={styles.label}>补充说明</Text>
        <TextField value={notes} onChangeText={setNotes} placeholder="例如：不吃香菜，所有菜都少辣" multiline />

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

  const handleDemo = async () => {
    try {
      const scan = await createDemoMenu();
      if (scan.menuId) router.push(`/menu/${scan.menuId}`);
    } catch (error) {
      Alert.alert("Demo 加载失败", error instanceof Error ? error.message : "请稍后重试");
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
        <Pressable style={styles.profileEntry} onPress={() => router.push("/profile")}>
          <Text style={styles.profileEntryText}>我</Text>
        </Pressable>
      </View>
      <Text style={styles.hero}>看懂任何外文菜单。</Text>
      <Text style={styles.sub}>拍一张照，AI 帮你翻译、点单，并把你的忌口写成服务员能看懂的语言。</Text>

      <View style={styles.featureStack}>
        {[
          ["①", "拍照识别", "对准菜单，自动框出每道菜"],
          ["②", "原图点菜", "点击菜单原图热区看中文详情"],
          ["③", "一键出示", "生成本地语言订单给服务员"]
        ].map(([num, title, desc]) => (
          <View key={title} style={styles.featureCard}>
            <View style={styles.featureIcon}><Text style={styles.featureIconText}>{num}</Text></View>
            <View style={styles.featureBody}>
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDesc}>{desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>当前忌口资料</Text>
          <Text style={styles.textLink} onPress={() => profile.reset()}>重新填写</Text>
        </View>
        <Text style={styles.cardText}>过敏：{profile.dietaryProfile.allergies.join("、") || "未填写"}</Text>
        <Text style={styles.cardText}>宗教/规则：{profile.dietaryProfile.religion || "未填写"}</Text>
        <Text style={styles.cardText}>生活方式：{profile.dietaryProfile.lifestyle.join("、") || "未填写"}</Text>
      </View>

      <View style={styles.mainCta}>
        <PrimaryButton onPress={() => router.push("/camera")}>拍菜单</PrimaryButton>
        <View style={styles.inlineLinks}>
          <Text style={styles.inlineMuted}>想先看效果？</Text>
          <Text style={styles.textLink} onPress={handleDemo}>加载 Demo 菜单</Text>
        </View>
      </View>

      <View style={styles.joinCard}>
        <Text style={styles.cardTitle}>已加入朋友的菜单？</Text>
        <View style={styles.joinRow}>
          <View style={styles.joinInput}>
            <TextField value={joinCode} onChangeText={(value) => setJoinCode(value.toUpperCase())} placeholder="输入房间码" autoCapitalize="characters" maxLength={8} />
          </View>
          <Pressable disabled={!joinCode.trim()} onPress={handleJoin} style={({ pressed }) => [styles.joinButton, !joinCode.trim() && styles.joinButtonDisabled, pressed && styles.historyPressed]}>
            <Text style={styles.joinButtonText}>加入</Text>
          </Pressable>
        </View>
        <Text style={styles.textLink} onPress={() => router.push("/join-room")}>打开完整加入页</Text>
      </View>

      {history.entries.length > 0 ? (
        <View style={styles.joinCard}>
          <Text style={styles.cardTitle}>最近记录</Text>
          {history.entries.slice(0, 5).map((entry) => (
            <Pressable key={entry.id} hitSlop={6} style={({ pressed }) => [styles.history, pressed && styles.historyPressed]} onPress={() => router.push(entry.kind === "menu" ? `/menu/${entry.id}` : `/receipt/${entry.id}`)}>
              <Text style={styles.historyTitle}>{entry.kind === "menu" ? "菜单" : "订单"} · {entry.title}</Text>
              <Text style={styles.historyMeta}>{entry.createdAt.slice(0, 10)}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
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
  profileEntry: { marginLeft: "auto", width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg2 },
  profileEntryText: { color: colors.ink, fontSize: 13, fontWeight: "900" },
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
  featureStack: {
    marginTop: 34,
    gap: 10
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.bg2
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line
  },
  featureIconText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  featureBody: {
    flex: 1
  },
  featureTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800"
  },
  featureDesc: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800"
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  card: {
    marginTop: 18,
    marginBottom: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.bg2,
    gap: 8
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mainCta: {
    marginTop: "auto",
    paddingTop: 12
  },
  inlineLinks: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4
  },
  inlineMuted: {
    color: colors.muted,
    fontSize: 12
  },
  textLink: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800"
  },
  joinCard: {
    marginTop: 18,
    gap: 12
  },
  joinRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  joinInput: {
    flex: 1
  },
  joinButton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ink
  },
  joinButtonDisabled: {
    opacity: 0.4
  },
  joinButtonText: {
    color: colors.bg,
    fontSize: 13,
    fontWeight: "800"
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
  history: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line
  },
  historyPressed: {
    opacity: 0.72
  },
  historyTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700"
  },
  historyMeta: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 11
  },
  muted: {
    color: colors.muted
  }
});
