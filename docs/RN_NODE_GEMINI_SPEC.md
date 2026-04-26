# RN + Node.js + Gemini 实施规格

## 1. 目标

这份文档面向第一版工程实现。目标是在黑客松周期内做出稳定闭环：

```text
拍照 -> 上传 -> Gemini 识别菜单和 bbox -> 原图热区点击 -> 多人点餐 -> 生成订单 -> 导出订单图片
```

## 2. 前端工程建议

推荐使用 Expo 管理 React Native 项目，原因是相机、相册、分享、保存图片和路演安装包更快落地。

推荐目录：

```text
apps/mobile/
  app/
    index.tsx
    camera.tsx
    scan/[scanId].tsx
    menu/[menuId].tsx
    dish/[itemId].tsx
    cart.tsx
    room/[roomId].tsx
    receipt/[receiptId].tsx
  src/
    components/
      MenuImageHotspots.tsx
      DishCard.tsx
      ReceiptCard.tsx
    design/
      colors.ts
      spacing.ts
      typography.ts
    api/
      client.ts
      menu.ts
      room.ts
      receipt.ts
    stores/
      cartStore.ts
```

关键依赖：

```text
expo
expo-router
expo-camera
expo-image-picker
expo-file-system
expo-media-library
expo-sharing
react-native-view-shot
@tanstack/react-query
zustand
react-native-svg
```

## 3. 从设计稿迁移的约束

`seemenu-uidesign` 的主推设计是「风格 C · 纯白克制系」。迁移时保留：

1. 白底、极淡灰分隔、橙色单点强调。
2. 大标题 + 小说明的层级。
3. 底部黑色或橙色主 CTA。
4. 订单页使用纸质收据视觉。
5. 拍照/识别过程保留扫描框和扫描光带。

需要修改：

1. 文案中的「AI 配图」改为「原图识别」或「菜品详情」。
2. `C_Detail` 中的「AI 示意图」标签移除。
3. 菜品详情头图优先用原图裁剪；没有 bbox 时使用简洁色块占位。

## 4. MenuImageHotspots 组件

输入数据：

```ts
type MenuItemHotspot = {
  id: string;
  sourceName: string;
  chineseName: string;
  bbox2d: [number, number, number, number] | null;
  bboxConfidence: "high" | "medium" | "low";
};
```

坐标换算：

```ts
const scale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
const renderWidth = imageWidth * scale;
const renderHeight = imageHeight * scale;
const offsetX = (containerWidth - renderWidth) / 2;
const offsetY = (containerHeight - renderHeight) / 2;

const [yMin, xMin, yMax, xMax] = bbox2d;
const left = offsetX + (xMin / 1000) * renderWidth;
const top = offsetY + (yMin / 1000) * renderHeight;
const width = ((xMax - xMin) / 1000) * renderWidth;
const height = ((yMax - yMin) / 1000) * renderHeight;
```

交互规则：

1. `bboxConfidence === "low"` 不显示热区。
2. 最小可点区域建议不低于 `44x32` dp。
3. 点击热区进入 `DishDetailScreen`。
4. 菜单列表始终存在，作为 bbox 错误时的兜底入口。

## 5. 后端工程建议

推荐目录：

```text
apps/server/
  src/
    app.ts
    env.ts
    routes/
      menu.routes.ts
      room.routes.ts
      receipt.routes.ts
    services/
      gemini.service.ts
      menuScan.service.ts
      receipt.service.ts
      storage.service.ts
      realtime.service.ts
    schemas/
      menu.schema.ts
      receipt.schema.ts
    db/
      prisma.ts
      schema.prisma
```

关键依赖：

```text
typescript
tsx
fastify
@fastify/multipart
@fastify/cors
@google/genai
zod
sharp
```

环境变量：

```text
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
PUBLIC_BASE_URL=http://localhost:3001
EXPO_PUBLIC_API_URL=http://localhost:3001
```

## 6. Gemini 调用策略

默认模型建议从 `gemini-2.5-flash` 开始。它更适合黑客松阶段的低延迟和成本控制；如果复杂菜单 bbox 质量不够，再只针对扫描任务切换到更强模型。

服务端调用原则：

1. 前端永远不直接调用 Gemini。
2. 后端保存 `raw_ai_output` 方便调试。
3. 用 schema 约束输出，用 `zod` 做二次校验。
4. JSON 校验失败时最多重试一次。
5. 图片压缩时保留原始宽高，bbox 映射依赖宽高。

菜单 schema 最小字段：

```ts
type ParsedMenu = {
  title: string | null;
  menu_language: string;
  target_language: string;
  currency: string | null;
  sections: Array<{
    id: string;
    source_name: string | null;
    chinese_name: string | null;
    items: Array<{
      id: string;
      source_name: string;
      chinese_name: string;
      description_zh: string;
      price: number | null;
      price_text: string | null;
      ingredients_guess: string[];
      allergens_guess: string[];
      dietary_flags: string[];
      spicy_level: number | null;
      confidence: "high" | "medium" | "low";
      bbox_2d: [number, number, number, number] | null;
      bbox_confidence: "high" | "medium" | "low";
    }>;
  }>;
  warnings: string[];
};
```

## 7. 订单图片导出

第一版优先端上导出，速度更快：

1. `ReceiptShowScreen` 渲染订单卡片。
2. `react-native-view-shot` 捕获订单区域为 PNG。
3. `expo-media-library` 保存到相册。
4. `expo-sharing` 调用系统分享。

订单图片必须包含：

1. 餐厅或菜单标题。
2. 原文菜名。
3. 数量。
4. 目标语言备注。
5. 过敏和忌口说明。
6. 中文核对文本可以保留小字号，但不能影响服务员阅读目标语言。

后端增强接口保留：

```http
POST /api/receipts/{receiptId}/image
```

后端可用 `satori + sharp` 或 `node-canvas` 生成分享图，适合历史订单和跨设备恢复。

## 8. 自部署 OCR 结论

MVP 主线不引入端侧或自部署 OCR。原因：

1. 菜单任务需要 OCR + 版面理解 + 翻译 + 风险推断，单纯 OCR 不能完成闭环。
2. RN 端侧模型会增加包体、原生依赖和性能调试成本。
3. 小程序环境更不适合部署 OCR 模型。
4. Gemini 可一次完成结构化菜单和 bbox，最适合黑客松闭环。

后续可评估：

1. PaddleOCR/PP-OCRv5：适合服务端 OCR 前置，降低 Gemini 图片识别成本。
2. RapidOCR：适合 ONNXRuntime/OpenVINO/MNN 等灵活部署。
3. Tesseract：成熟但复杂菜单和日韩文本拍照场景不建议作为主线。

## 9. 安全要求

1. 真实 `GEMINI_API_KEY` 不得进入 Git。
2. RN 包内不得包含 Gemini key。
3. 服务端日志不要打印完整请求图片、完整 key 或用户忌口隐私。
4. 第一版订单和菜单图片只保存在本地 `apps/server/data/`；后续如果上传对象存储，需要设置过期链接或访问控制。
5. 用户过敏原提示必须标注为 AI 推断，需要服务员确认。
