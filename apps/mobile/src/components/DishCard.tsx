import { Pressable, StyleSheet, Text, View } from "react-native";
import type { MenuItem } from "@/types/domain";
import { colors } from "@/design/colors";

export function DishCard({
  item,
  quantity = 0,
  onPress,
  onAdd
}: {
  item: MenuItem;
  quantity?: number;
  onPress: () => void;
  onAdd: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.art}>
        <Text style={styles.artText}>{item.chineseName.slice(0, 1)}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.chineseName}</Text>
          {item.confidence !== "high" ? <Text style={styles.warn}>低置信度</Text> : null}
        </View>
        <Text style={styles.source}>{item.sourceName}</Text>
        <Text numberOfLines={2} style={styles.desc}>{item.descriptionZh}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>{item.priceText ?? "价格待确认"}</Text>
          <Pressable onPress={onAdd} style={styles.add}>
            <Text style={styles.addText}>{quantity > 0 ? `+ ${quantity}` : "+"}</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line
  },
  art: {
    width: 72,
    height: 72,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft
  },
  artText: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: "800"
  },
  body: {
    flex: 1
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: colors.ink
  },
  warn: {
    color: colors.accent,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "700"
  },
  source: {
    marginTop: 2,
    fontSize: 11,
    color: colors.muted
  },
  desc: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    color: colors.ink2
  },
  bottom: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink
  },
  add: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  addText: {
    color: colors.bg,
    fontWeight: "800"
  }
});
