import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Alert, StyleSheet, Text, View } from "react-native";
import { getMenu } from "@/api/menu";
import { createRoom, updateCart } from "@/api/room";
import { DishCard } from "@/components/DishCard";
import { MenuImageHotspots } from "@/components/MenuImageHotspots";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/design/colors";
import { useCartStore } from "@/stores/cartStore";
import { useProfileStore } from "@/stores/profileStore";
import { useHistoryStore } from "@/stores/historyStore";
import { getDietaryRisks } from "@/utils/dietary";
import { useEffect, useState } from "react";

export default function MenuScreen() {
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const menu = useQuery({ queryKey: ["menu", menuId], queryFn: () => getMenu(menuId) });
  const cart = useCartStore();
  const profile = useProfileStore();
  const history = useHistoryStore();
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (menu.data) {
      void history.add({ id: menu.data.id, title: menu.data.title ?? "未命名菜单", kind: "menu", createdAt: new Date().toISOString() });
    }
  }, [menu.data?.id]);

  if (menu.isLoading || !menu.data) return <Screen><Text>加载菜单...</Text></Screen>;
  const quantities = new Map(cart.items.map((item) => [item.menuItemId, item.quantity]));
  const total = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const startRoom = async () => {
    try {
      const result = await createRoom({
        menuId,
        hostName: profile.displayName,
        dietaryProfile: profile.dietaryProfile,
        targetOrderLanguage: "ja"
      });
      cart.setSession({ menuId, roomId: result.room.id, memberId: result.memberId });
      if (cart.items.length > 0) {
        await updateCart(result.room.id, result.memberId, cart.items);
      }
      router.push(`/room/${result.room.id}`);
    } catch (error) {
      Alert.alert("创建房间失败", error instanceof Error ? error.message : "请稍后重试");
    }
  };

  return (
    <Screen>
      <Text style={styles.meta}>东京 · {menu.data.menuLanguage} 菜单</Text>
      <Text style={styles.title}>{menu.data.title ?? "识别菜单"}</Text>
      <Text style={styles.sub}>点击原图中的菜名区域，查看中文解释和忌口风险。</Text>
      <Text style={styles.debugToggle} onPress={() => setShowDebug(!showDebug)}>{showDebug ? "隐藏热区调试" : "显示热区调试"}</Text>

      <MenuImageHotspots
        menu={menu.data}
        onPressItem={(item) => router.push({ pathname: "/dish/[itemId]", params: { itemId: item.id, menuId } })}
      />

      {menu.data.warnings.map((warning) => (
        <Text key={warning} style={styles.warning}>{warning}</Text>
      ))}
      {showDebug ? (
        <View style={styles.debugBox}>
          {menu.data.items.map((item) => (
            <Text key={item.id} style={styles.debugLine}>{item.id}: {item.bbox2d?.join(",") ?? "no bbox"} · {item.bboxConfidence}</Text>
          ))}
        </View>
      ) : null}

      <Text style={styles.section}>菜品列表</Text>
      {menu.data.items.map((item) => (
        <DishCard
          key={item.id}
          item={item}
          quantity={quantities.get(item.id) ?? 0}
          risks={getDietaryRisks(item, profile.dietaryProfile)}
          onPress={() => router.push({ pathname: "/dish/[itemId]", params: { itemId: item.id, menuId } })}
          onAdd={() => {
            cart.setSession({ menuId });
            cart.addItem(item);
          }}
        />
      ))}

      <View style={styles.cartBar}>
        <View>
          <Text style={styles.cartTitle}>已选 {total} 份</Text>
          <Text style={styles.cartSub}>可创建房间邀请朋友一起点</Text>
        </View>
        <PrimaryButton disabled={total === 0} tone="accent" onPress={startRoom}>创建房间</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  meta: {
    marginTop: 16,
    color: colors.muted,
    fontSize: 12
  },
  title: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  sub: {
    marginTop: 6,
    marginBottom: 16,
    color: colors.muted,
    lineHeight: 21
  },
  warning: {
    marginTop: 10,
    color: colors.accent,
    fontSize: 12,
    lineHeight: 18
  },
  debugToggle: {
    marginBottom: 12,
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800"
  },
  debugBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.bg2
  },
  debugLine: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 18
  },
  section: {
    marginTop: 24,
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  cartBar: {
    marginTop: 20,
    padding: 14,
    borderRadius: 24,
    backgroundColor: colors.ink,
    gap: 12
  },
  cartTitle: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: "900"
  },
  cartSub: {
    marginTop: 2,
    color: "rgba(255,255,255,0.6)",
    fontSize: 12
  }
});
