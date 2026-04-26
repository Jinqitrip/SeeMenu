import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "@/api/menu";
import { createRoom, updateCart } from "@/api/room";
import { Screen } from "@/components/Screen";
import { StateView } from "@/components/StateView";
import { colors } from "@/design/colors";
import { useCartStore } from "@/stores/cartStore";
import { useProfileStore } from "@/stores/profileStore";

export default function CartScreen() {
  const cart = useCartStore();
  const profile = useProfileStore();
  const menu = useQuery({ queryKey: ["menu", cart.menuId], queryFn: () => getMenu(cart.menuId ?? ""), enabled: Boolean(cart.menuId) });

  if (!cart.menuId) return <Screen scroll={false}><StateView title="还没有选菜" description="先拍一张菜单，选择你想点的菜。" actionLabel="去拍菜单" onAction={() => router.replace("/camera")} /></Screen>;
  if (menu.isLoading || !menu.data) return <Screen scroll={false}><StateView title="加载选菜" loading /></Screen>;

  const createOrderRoom = async () => {
    try {
      const result = await createRoom({ menuId: cart.menuId!, hostName: profile.displayName, dietaryProfile: profile.dietaryProfile, targetOrderLanguage: "ja" });
      cart.setSession({ roomId: result.room.id, memberId: result.memberId });
      await updateCart(result.room.id, result.memberId, cart.items);
      router.push(`/room/${result.room.id}`);
    } catch (error) {
      Alert.alert("创建房间失败", error instanceof Error ? error.message : "请稍后重试");
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>我的选菜</Text>
      <Text style={styles.sub}>{cart.items.length} 道 · {cart.items.reduce((sum, item) => sum + item.quantity, 0)} 份</Text>
      {cart.items.map((line) => {
        const item = menu.data.items.find((candidate) => candidate.id === line.menuItemId);
        if (!item) return null;
        return (
          <View key={line.menuItemId} style={styles.line}>
            <View style={styles.thumb}><Text style={styles.thumbText}>{item.chineseName.slice(0, 1)}</Text></View>
            <View style={styles.lineBody}>
              <Text style={styles.name}>{item.chineseName}</Text>
              <Text style={styles.source}>{item.sourceName}</Text>
              {line.noteZh ? <Text style={styles.note}>备注：{line.noteZh}</Text> : <Text style={styles.addNote}>+ 添加备注</Text>}
              <View style={styles.qtyRow}>
                <Pressable style={styles.qtyBtn} onPress={() => cart.removeItem(item.id)}><Text style={styles.qtyText}>-</Text></Pressable>
                <Text style={styles.qty}>{line.quantity}</Text>
                <Pressable style={styles.qtyBtnDark} onPress={() => cart.addItem(item, line.noteZh)}><Text style={styles.qtyTextDark}>+</Text></Pressable>
              </View>
            </View>
            <Text style={styles.price}>{item.priceText ?? ""}</Text>
          </View>
        );
      })}
      <View style={styles.footer}>
        <Text style={styles.total}>合计 {cart.items.reduce((sum, item) => sum + item.quantity, 0)} 份</Text>
        <Pressable disabled={cart.items.length === 0} style={[styles.primary, cart.items.length === 0 && styles.disabled]} onPress={createOrderRoom}>
          <Text style={styles.primaryText}>确认 · 出示给店员</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: 36, color: colors.ink, fontSize: 28, fontWeight: "900" },
  sub: { marginTop: 4, marginBottom: 12, color: colors.muted },
  line: { flexDirection: "row", gap: 12, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.line },
  thumb: { width: 56, height: 56, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: colors.accentSoft },
  thumbText: { color: colors.accent, fontSize: 22, fontWeight: "900" },
  lineBody: { flex: 1 },
  name: { color: colors.ink, fontSize: 15, fontWeight: "900" },
  source: { marginTop: 2, color: colors.muted, fontSize: 11 },
  note: { marginTop: 6, color: colors.accent, fontSize: 11, backgroundColor: colors.accentSoft, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5 },
  addNote: { marginTop: 6, color: colors.muted, fontSize: 11, textDecorationLine: "underline" },
  qtyRow: { marginTop: 8, flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: StyleSheet.hairlineWidth, borderColor: colors.line },
  qtyBtnDark: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: colors.accent },
  qtyText: { color: colors.ink, fontWeight: "900" },
  qtyTextDark: { color: colors.bg, fontWeight: "900" },
  qty: { minWidth: 14, textAlign: "center", fontWeight: "900" },
  price: { color: colors.ink, fontWeight: "900" },
  footer: { marginTop: 24, gap: 12 },
  total: { color: colors.ink, fontSize: 20, fontWeight: "900" },
  primary: { height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: colors.ink },
  disabled: { opacity: 0.45 },
  primaryText: { color: colors.bg, fontWeight: "900" }
});
