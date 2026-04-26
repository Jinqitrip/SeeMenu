import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getMenu } from "@/api/menu";
import { Chip } from "@/components/Chip";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";
import { useCartStore } from "@/stores/cartStore";

const quickNotes = ["不要葱", "不要香菜", "少盐", "少辣", "请确认不含过敏原"];

export default function DishScreen() {
  const { itemId, menuId } = useLocalSearchParams<{ itemId: string; menuId: string }>();
  const menu = useQuery({ queryKey: ["menu", menuId], queryFn: () => getMenu(menuId) });
  const cart = useCartStore();
  const [note, setNote] = useState("");

  if (menu.isLoading || !menu.data) return <Screen><Text>加载菜品...</Text></Screen>;
  const item = menu.data.items.find((candidate) => candidate.id === itemId);
  if (!item) return <Screen><Text>菜品不存在</Text></Screen>;

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.heroText}>{item.chineseName.slice(0, 1)}</Text>
      </View>
      <Text style={styles.title}>{item.chineseName}</Text>
      <Text style={styles.source}>{item.sourceName}</Text>
      <Text style={styles.price}>{item.priceText ?? "价格待确认"}</Text>
      <Text style={styles.desc}>{item.descriptionZh}</Text>

      <Text style={styles.label}>主要食材推断</Text>
      <View style={styles.chips}>{item.ingredientsGuess.map((value) => <Chip key={value} label={value} />)}</View>

      <Text style={styles.label}>过敏原与风险</Text>
      <View style={styles.chips}>{[...item.allergensGuess, ...item.dietaryFlags].map((value) => <Chip key={value} label={value} />)}</View>
      <Text style={styles.warning}>这些信息由 AI 推断，请向服务员确认。</Text>

      <Text style={styles.label}>忌口备注</Text>
      <View style={styles.chips}>
        {quickNotes.map((value) => <Chip key={value} label={value} selected={note.includes(value)} onPress={() => setNote(note ? `${note}；${value}` : value)} />)}
      </View>
      <TextInput value={note} onChangeText={setNote} placeholder="例如：不要葱，对花生过敏" style={styles.input} multiline />

      <PrimaryButton tone="accent" onPress={() => {
        cart.setSession({ menuId });
        cart.addItem(item, note.trim());
        router.back();
      }}>加入订单</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 20,
    height: 220,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft
  },
  heroText: {
    color: colors.accent,
    fontSize: 88,
    fontWeight: "900"
  },
  title: {
    marginTop: 20,
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  source: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 13
  },
  price: {
    marginTop: 12,
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  desc: {
    marginTop: 12,
    color: colors.ink2,
    fontSize: 15,
    lineHeight: 24
  },
  label: {
    marginTop: 22,
    marginBottom: 8,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  warning: {
    marginTop: 10,
    color: colors.accent,
    fontSize: 12
  },
  input: {
    minHeight: 76,
    marginTop: 12,
    marginBottom: 18,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line
  }
});
