# SeeMenu 智拍菜单黑客松开发文档

## 1. 项目定位

SeeMenu 解决出境旅行中的跨语言点餐问题。它不是普通翻译器，而是把菜单图片转成一个可点击、可协同、可出示的点餐系统。

核心链路：

```text
菜单图片 -> Gemini 结构化识别 -> 原图热区点击 -> 多人协同选菜 -> 当地语言订单 -> 订单图片导出
```

评委应当在 2 分钟内看到：

1. 痛点真实：菜单看不懂、忌口说不清、多人传菜单低效。
2. AI 必要：菜单 OCR、版面理解、菜品解释、忌口表达和订单翻译需要上下文能力。
3. 闭环完整：不是只给翻译文本，而是完成从拍照到出示订单的点餐动作。

## 2. 已确认产品与技术决策

1. 第一版前端使用 React Native，优先多端 App 和黑客松路演安装包。
2. 后端只使用 Node.js，不拆 FastAPI/Python 服务。
3. AI 使用 Gemini API，且只能由服务端调用。
4. AI 菜品图暂不进入 MVP。
5. 菜单原图热区点击是主线功能，不是加分项。
6. 订单图片导出进入 MVP。
7. 自部署 OCR 可以研究，但第一版不作为主链路阻塞项。

密钥约束：Gemini API key 只放服务端环境变量，不写入仓库、前端包、README 或设计稿。

## 3. MVP 范围

### 必做

1. 拍照或相册上传菜单图片。
2. Node.js 后端调用 Gemini，返回结构化菜单、中文解释、风险标签、置信度和 bbox 热区。
3. React Native 在菜单原图上叠加透明热区，点击菜名区域打开菜品详情。
4. 菜品详情支持查看原文名、中文名、价格、说明、推断食材、过敏原、忌口风险和备注。
5. 创建多人点餐房间，朋友通过房间码或二维码加入。
6. 每个成员维护自己的购物车和忌口备注，房主查看实时汇总。
7. 生成当地语言订单，保留原文菜名，支持中文核对。
8. 导出订单图片，支持保存到相册或系统分享。

### 暂不做

1. AI 菜品图生成。
2. 支付、优惠券、餐厅商家后台。
3. 真实菜品图片检索和图库版权处理。
4. 端侧 OCR 模型部署。
5. 复杂菜单热区人工拖拽校正。

### 可后续增强

1. PaddleOCR/RapidOCR 作为服务端 OCR 前置，降低 Gemini 图片调用成本。
2. 多图片拼接，支持多页菜单。
3. 服务员确认回译，把服务员修改内容翻译回中文。
4. 后端生成 PDF 或可打印订单。
5. 热区编辑器，修正 bbox 不准的问题。

## 4. 设计稿落地

设计稿位于 `seemenu-uidesign/`，主推方向是「风格 C · 纯白克制系」。第一版应优先还原这些页面：

| 设计稿组件 | RN 页面 | MVP 调整 |
| --- | --- | --- |
| `C_Home` | `HomeScreen` | 拍菜单、输入房间码 |
| `C_Capture` | `CameraScreen` | 相机拍摄、相册上传 |
| `C_PhotoReview` | `PhotoReviewScreen` | 确认照片、开始识别 |
| `C_Recognizing` | `ScanProgressScreen` | 识别进度、扫描动效 |
| `C_RecognizeFail` | `ScanFailedScreen` | 失败提示、重拍 |
| `C_Menu` | `MenuScreen` | 分类、列表、底部购物车 |
| 新增热区层 | `MenuImageHotspots` | 主线功能，点击 bbox 打开详情 |
| `C_Detail` | `DishDetailScreen` | 移除 AI 示意图，改用原图裁剪或信息头图 |
| `C_Cart` | `CartScreen` | 我的选菜、数量、备注 |
| `C_Room` | `RoomScreen` | 房间码、成员、实时汇总 |
| `C_RoomQR` | `RoomShareSheet` | 二维码邀请、保存图片 |
| `C_JoinRoom` | `JoinRoomScreen` | 输入房间码或扫码加入 |
| `C_Order` | `ReceiptScreen` | 双语订单核对 |
| `C_OrderShow` | `ReceiptShowScreen` | 放大出示、订单图片导出 |

设计 token 以 `style-c-1.jsx` 的 `C` 常量为准：

```ts
export const colors = {
  bg: "#FFFFFF",
  bg2: "#F7F7F8",
  bg3: "#F2F2F4",
  ink: "#000000",
  ink2: "#3C3C43",
  muted: "#8E8E93",
  muted2: "#C7C7CC",
  line: "#E5E5EA",
  accent: "#FF6B35",
  accentSoft: "#FFF1EB",
  green: "#34C759"
};
```

## 5. 技术架构

```text
React Native / Expo
  |
  | HTTPS: 上传图片、拉取菜单、提交购物车、生成订单
  | Polling: 房间购物车同步
  v
Node.js + TypeScript Backend
  |
  | 图片压缩、Gemini 调用、JSON 校验、订单翻译、订单图片生成
  v
SQLite + Runtime Cache
  |
  v
Local File System

AI Provider
  Gemini API: 图片理解、OCR、bbox 热区、结构化菜单、订单翻译
```

推荐后端栈：

1. `Fastify` 或 `Express` + TypeScript。
2. `@google/genai` 调用 Gemini API。
3. `zod` 校验 Gemini 返回 JSON。
4. `sharp` 做图片压缩、裁剪和服务端订单图生成备选。
5. SQLite 持久化菜单、房间、订单和 Gemini 缓存，运行时 Map 做快速读取。
6. 本地 `apps/server/data/` 保存上传图片和订单图片。

推荐 RN/Expo 依赖：

1. `expo-camera`、`expo-image-picker`。
2. `expo-file-system`、`expo-media-library`、`expo-sharing`。
3. `react-native-view-shot` 用于订单图片导出。
4. `@tanstack/react-query` 管理 API 请求。
5. `zustand` 管理本地购物车状态。
6. 轮询房间接口管理第一版协同状态。
7. `react-native-svg` 承载图标和部分视觉元素。

## 6. Gemini 菜单识别方案

流程：

1. RN 上传菜单图片到 Node.js 后端。
2. 后端用 `sharp` 压缩图片，保留原图比例和尺寸元数据。
3. 后端调用 Gemini，传入图片、目标语言、所在国家和结构化输出 schema。
4. Gemini 返回菜单结构、菜品字段、bbox 和警告信息。
5. 后端用 `zod` 校验；失败则重试一次，仍失败则返回 `failed` 和可读错误。
6. 后端保存原图、结构化菜单、`raw_ai_output` 和 bbox。
7. RN 渲染菜单原图热区和菜品列表。

Gemini 输出坐标规则：

1. `bbox_2d` 使用 `[y_min, x_min, y_max, x_max]`。
2. 坐标归一化到 `0-1000`。
3. bbox 覆盖菜名和价格所在行即可，不要求覆盖整块菜品说明。
4. bbox 不确定时返回 `null`，不要猜。

菜单识别 JSON 草案：

```json
{
  "menu_language": "ja",
  "target_language": "zh-CN",
  "currency": "JPY",
  "title": "麺処 つばき",
  "sections": [
    {
      "id": "sec_001",
      "source_name": "ラーメン",
      "chinese_name": "拉面",
      "items": [
        {
          "id": "item_001",
          "source_name": "豚骨ラーメン",
          "chinese_name": "豚骨拉面",
          "description_zh": "猪骨汤底拉面，口味浓郁，通常含猪肉和小麦面。",
          "price": 1180,
          "price_text": "¥1,180",
          "ingredients_guess": ["猪骨汤", "猪肉", "小麦面", "葱"],
          "allergens_guess": ["小麦", "大豆"],
          "dietary_flags": ["contains_pork", "contains_gluten"],
          "spicy_level": 0,
          "confidence": "high",
          "bbox_2d": [205, 126, 250, 725],
          "bbox_confidence": "high"
        }
      ]
    }
  ],
  "warnings": ["过敏原为 AI 推断，请向服务员确认。"]
}
```

Prompt 要点：

1. 不要编造价格，无法识别返回 `null`。
2. 区分菜单原文可见信息和基于菜名推断的信息。
3. 过敏原、宗教饮食风险和口味必须用 `guess` 或 `risk` 语义表达。
4. 原文菜名必须保留，订单生成时服务员依赖原文定位。
5. 输出必须严格符合 schema，不要在 JSON 外追加解释。

## 7. 原图热区点击

`MenuImageHotspots` 负责把归一化 bbox 映射到屏幕：

```text
输入：imageUri、原图宽高、屏幕内图片渲染宽高、items[].bbox_2d
处理：计算 contain 模式下的 offsetX/offsetY/renderWidth/renderHeight
输出：透明 Pressable 热区
点击：打开 DishDetailScreen(itemId)
```

容错策略：

1. `bbox_confidence=low` 不显示热区。
2. 热区面积过小则扩大到最低可点击面积，例如 44x32 dp。
3. 点击错误时用户仍可通过菜品列表进入详情。
4. 演示菜单需要提前固定，确保至少 5 个热区准确可点。

## 8. 关键 API 设计

### 菜单扫描

```http
POST /api/menu/scans
Content-Type: multipart/form-data
```

字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| image | file | 菜单图片 |
| sourceLanguage | string | 可选，自动识别时为空 |
| targetLanguage | string | 默认 `zh-CN` |
| countryCode | string | 旅行国家 |

响应：

```json
{
  "scanId": "scan_123",
  "status": "processing",
  "menuId": null
}
```

### 查询扫描状态

```http
GET /api/menu/scans/{scanId}
```

### 获取菜单

```http
GET /api/menus/{menuId}
```

返回结构化菜单、原图地址、原图尺寸、菜品详情、bbox 和置信度。

### 创建房间

```http
POST /api/rooms
```

请求：

```json
{
  "menuId": "menu_456",
  "targetOrderLanguage": "ja",
  "hostName": "Fiona"
}
```

### 更新购物车

```http
PUT /api/rooms/{roomId}/members/{memberId}/cart
```

### 生成订单

```http
POST /api/rooms/{roomId}/receipt
```

响应：

```json
{
  "receiptId": "receipt_001",
  "targetLanguageText": "注文をお願いします。豚骨ラーメンを1つ、ねぎ抜きでお願いします。",
  "chineseText": "请下单：豚骨拉面 1 份，不要葱。",
  "safetyNote": "过敏原和忌口请再次向服务员确认。",
  "imageUrl": null
}
```

### 导出订单图片

```http
POST /api/receipts/{receiptId}/image
```

第一版推荐端上用 `react-native-view-shot` 导出；这个接口作为后端增强和历史订单恢复能力保留。

## 9. 数据模型

### menu_items 关键字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 菜品 ID |
| menu_id | string | 菜单 ID |
| section_name | string | 分类 |
| source_name | string | 原文名 |
| chinese_name | string | 中文名 |
| description_zh | text | 中文说明 |
| price | numeric | 价格数值 |
| price_text | string | 原始价格文本 |
| ingredients_guess | jsonb | 推断食材 |
| allergens_guess | jsonb | 推断过敏原 |
| dietary_flags | jsonb | 饮食风险标签 |
| confidence | enum | high/medium/low |
| bbox_2d | jsonb | `[y_min, x_min, y_max, x_max]`，0-1000 归一化 |
| bbox_confidence | enum | high/medium/low |

### receipts

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | string | 订单 ID |
| room_id | string | 房间 ID |
| target_language | string | 目标语言 |
| target_language_text | text | 当地语言订单 |
| chinese_text | text | 中文核对文本 |
| image_url | string | 导出的订单图片地址 |
| created_at | timestamp | 创建时间 |

其他表沿用 `menu_scans`、`menus`、`rooms`、`room_members`、`cart_items`。

## 10. OCR 开源模型评估

结论：MVP 不建议端侧 OCR，也不建议让自部署 OCR 阻塞主流程。第一版用 Gemini 一次完成 OCR、版面理解、bbox 和翻译。

候选方案：

| 方案 | 优点 | 风险 | 建议 |
| --- | --- | --- | --- |
| Gemini 视觉 | OCR、版面理解、翻译、bbox 一次完成，Node 接入简单 | 成本、网络依赖、bbox 偶发不稳 | MVP 默认 |
| PaddleOCR / PP-OCRv5 | 多语言 OCR 能力强，有服务端和移动端部署资料 | Node 内集成成本高，仍需语义翻译 | 后续服务端降本 |
| RapidOCR | ONNXRuntime/OpenVINO/MNN 等部署形态灵活 | 仍要处理版面聚类和翻译 | 后续 OCR 前置 |
| Tesseract | 成熟开源，支持多语言 OCR | 拍照菜单、日韩文本、复杂版面效果不稳定 | 仅作兜底研究 |

端侧判断：

1. React Native 可以通过原生模块接 ONNX/Paddle Lite，但模型体积、性能和调试成本不适合黑客松。
2. 微信小程序基本不适合端侧部署这类 OCR 模型。
3. 即使端侧 OCR 成功，仍需要后端做翻译、忌口推断、订单生成和多人协同。

## 11. 安全与准确性边界

1. 过敏原由 AI 推断，不保证完整。
2. 低置信度菜品需要人工确认。
3. bbox 不确定时不显示热区，避免误点。
4. 订单翻译应让服务员确认后再下单。
5. 订单生成必须保留原文菜名。
6. API key 只保存在服务端环境变量。

## 12. 黑客松排期

### 0.5 天：产品与设计落地

1. 固定演示脚本和样例菜单。
2. 从 `seemenu-uidesign` 提取风格 C 的 token、页面结构和组件。
3. 搭建 RN/Expo 与 Node.js 项目骨架。

### 第 1 天：扫描识别闭环

1. 完成相机/相册上传。
2. 完成 Node.js 上传接口和 Gemini 调用。
3. 保存菜单、菜品、bbox。
4. 完成菜单原图热区点击和菜品详情页。

### 第 2 天：点餐与订单

1. 完成购物车、多人房间和实时同步。
2. 生成当地语言订单。
3. 完成订单图片导出、保存和分享。
4. 加入错误提示、置信度、安全提示和网络失败兜底。

### 最后半天：演示打磨

1. 固定 2-3 份可稳定识别的演示菜单。
2. 准备真实扫描和本地样例兜底两套流程。
3. 录制 30 秒备用演示视频。
4. 检查 API key、日志和样例数据不泄露敏感信息。

## 13. 验收标准

1. 任意一张样例菜单能完成上传、识别、展示。
2. 至少 5 个菜品有中文名、简介、价格、风险标签和 bbox。
3. 菜单原图上至少 5 个热区可点击并打开正确菜品详情。
4. 两个用户能加入同一房间，各自添加菜品和备注。
5. 房主能看到汇总订单。
6. 系统能生成目标语言订单，并保留原文菜名。
7. 订单可导出为图片并保存或分享。
8. 低置信度、过敏原和 AI 推断都有明确提示。

## 14. 参考资料

1. Gemini 图片理解：https://ai.google.dev/gemini-api/docs/image-understanding
2. Gemini 结构化输出：https://ai.google.dev/gemini-api/docs/structured-output
3. Gemini 官方 SDK：https://ai.google.dev/gemini-api/docs/libraries
4. Gemini 模型列表：https://ai.google.dev/gemini-api/docs/models
5. PaddleOCR 文档：https://paddlepaddle.github.io/PaddleOCR/
6. RapidOCR：https://github.com/RapidAI/RapidOCR
7. Tesseract OCR：https://github.com/tesseract-ocr/tesseract
