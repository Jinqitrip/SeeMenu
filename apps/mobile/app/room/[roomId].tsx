import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Alert, StyleSheet, Text, View } from "react-native";
import { createReceipt } from "@/api/receipt";
import { getRoom, updateCart } from "@/api/room";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";
import { useCartStore } from "@/stores/cartStore";

export default function RoomScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const cart = useCartStore();
  const room = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoom(roomId),
    refetchInterval: 1800
  });

  const syncCart = async () => {
    if (!cart.memberId) return;
    await updateCart(roomId, cart.memberId, cart.items);
    await room.refetch();
  };

  const makeReceipt = async () => {
    try {
      if (cart.memberId) await syncCart();
      const receipt = await createReceipt(roomId, "ja");
      router.push(`/receipt/${receipt.id}`);
    } catch (error) {
      Alert.alert("生成失败", error instanceof Error ? error.message : "请稍后重试");
    }
  };

  if (room.isLoading || !room.data) return <Screen><Text>加载房间...</Text></Screen>;

  return (
    <Screen>
      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>ROOM CODE</Text>
        <Text style={styles.code}>{room.data.joinCode}</Text>
        <Text style={styles.codeHint}>朋友打开 SeeMenu 输入此码即可加入</Text>
      </View>

      <View style={styles.syncRow}>
        <Text style={styles.section}>房间内 · {room.data.members.length} 人</Text>
        <Text style={styles.green}>● 实时同步</Text>
      </View>

      {room.data.members.map((member) => (
        <View key={member.id} style={styles.member}>
          <Text style={styles.memberName}>{member.displayName}</Text>
          <Text style={styles.memberMeta}>已选 {member.cart.reduce((sum, item) => sum + item.quantity, 0)} 份</Text>
          <Text style={styles.memberDiet}>忌口：{[
            ...member.dietaryProfile.allergies,
            member.dietaryProfile.religion,
            ...member.dietaryProfile.lifestyle,
            member.dietaryProfile.notes
          ].filter(Boolean).join("、") || "未填写"}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.total}>合计 {room.data.totalItems} 份</Text>
        <PrimaryButton tone="light" onPress={syncCart}>同步我的选菜</PrimaryButton>
        <PrimaryButton tone="accent" onPress={makeReceipt}>生成订单</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  codeCard: {
    marginTop: 22,
    padding: 22,
    borderRadius: 20,
    backgroundColor: colors.ink
  },
  codeLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "800"
  },
  code: {
    marginTop: 4,
    color: colors.bg,
    fontSize: 44,
    letterSpacing: 8,
    fontWeight: "900"
  },
  codeHint: {
    marginTop: 6,
    color: "rgba(255,255,255,0.7)"
  },
  syncRow: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  section: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  green: {
    color: colors.green,
    fontSize: 12
  },
  member: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line
  },
  memberName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  memberMeta: {
    marginTop: 4,
    color: colors.muted
  },
  memberDiet: {
    marginTop: 6,
    color: colors.accent,
    fontSize: 12,
    lineHeight: 18
  },
  footer: {
    marginTop: 24,
    gap: 12
  },
  total: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  }
});
