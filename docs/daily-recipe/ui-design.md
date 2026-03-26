# 每日菜谱 - UI Design

## Design Direction: 菜市场海报风 (Market Poster)

灵感来自中国菜市场的手写价目牌和日式居酒屋的手绘菜单——大胆、直接、有烟火气。不追求精致的科技感，而是追求**热闹的生活感**。

---

## Color Palette

```
背景底色     #FFF8F0   (暖白，像宣纸)
卡片底色     #FFFDFB   (纯净白)
主文字       #1A0F0A   (深褐，不用纯黑)
副文字       #8B7355   (暖灰棕)
主色-橙      #E8600A   (锅气橙，比 Tailwind orange-500 更沉稳)
强调-红      #C23A2B   (辣椒红，用于"划走")
强调-绿      #2D7D46   (葱绿，用于"记下来")
人数选中     #E8600A   (与主色同)
人数未选中   #F3E8DA   (淡米色)
```

## Typography

```
菜名标题     "ZCOOL KuaiLe" (站酷快乐体) 或 "Ma Shan Zheng" (马善政毛笔楷书)
             — Google Fonts 可用，手写风格，充满人情味
             — 大号: 36px / 2.25rem, font-weight: 400

正文/食材    "Noto Sans SC" weight 400
             — 干净可读，14-16px

按钮文字     "Noto Sans SC" weight 700
             — 粗体有力，16px

数字/用量    "DM Mono" 或 Geist Mono (项目已有)
             — 等宽数字对齐好看，14px
```

---

## Page Layout (Mobile-First)

整体为单屏体验，以**卡片**为核心，上下留出呼吸空间。

```
┌──────────────────────────────┐
│         ← 顶部留白 24px →    │
│                              │
│   吃 点 啥                    │  ← 小字 logo, 左对齐, 12px 大写字母间距
│                              │
│  ┌────────────────────────┐  │
│  │                        │  │
│  │    🍅 番茄炒蛋          │  │  ← 菜名，手写体，居中
│  │                        │  │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─   │  │  ← 虚线分割
│  │                        │  │
│  │  食材                   │  │
│  │  番茄    2 个           │  │  ← 左右两列：食材名 + 用量
│  │  鸡蛋    3 个           │  │
│  │  葱花    适量           │  │
│  │  盐      1/2 茶匙      │  │
│  │  糖      1 茶匙        │  │
│  │                        │  │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─   │  │
│  │                        │  │
│  │  做法                   │  │
│  │  ① 番茄切块，鸡蛋打散  │  │  ← 圆圈数字序号
│  │  ② 热锅冷油，炒蛋盛出  │  │
│  │  ③ 再起油锅，炒番茄    │  │
│  │  ④ 番茄出汁后加蛋翻炒  │  │
│  │  ⑤ 调味，撒葱花出锅    │  │
│  │                        │  │
│  └────────────────────────┘  │
│                              │
│  ┌──────────────────────┐    │
│  │  1人  [2人]  3人  [__]│    │  ← 人数选择栏
│  └──────────────────────┘    │
│                              │
│  ┌──────────┐ ┌──────────┐   │
│  │          │ │          │   │
│  │  划 走   │ │ 记下来   │   │  ← 双按钮，等宽并排
│  │  ←       │ │       ♥  │   │
│  │          │ │          │   │
│  └──────────┘ └──────────┘   │
│                              │
│         ← 底部留白 32px →    │
└──────────────────────────────┘
```

---

## Component Details

### 1. Recipe Card 菜谱卡片

```
容器:
  - background: #FFFDFB
  - border: 1.5px solid #F0E6D6  (淡黄边框，像旧纸)
  - border-radius: 16px
  - box-shadow: 0 2px 24px rgba(26, 15, 10, 0.06)
  - padding: 32px 24px
  - max-width: 400px
  - 居中显示

菜名区域:
  - font-family: "Ma Shan Zheng" 或 "ZCOOL KuaiLe"
  - font-size: 36px
  - color: #1A0F0A
  - text-align: center
  - margin-bottom: 24px
  - 菜名前可带一个食材 emoji 作为装饰

分割线:
  - border-top: 1.5px dashed #E8D5C0
  - margin: 16px 0

食材列表:
  - 小标题 "食材" — 12px, uppercase, letter-spacing: 2px, color: #8B7355
  - 每行: flex, justify-between
  - 左侧: 食材名, Noto Sans SC 400, 15px, #1A0F0A
  - 右侧: 用量, DM Mono / Geist Mono, 14px, #8B7355
  - 行间距: 8px

烹饪步骤:
  - 小标题 "做法" — 同上样式
  - 步骤序号: 使用圆圈数字 ①②③④⑤
  - 序号颜色: #E8600A (主色橙)
  - 步骤文字: 15px, #1A0F0A, line-height: 1.7
  - 步骤间距: 12px
```

### 2. Serving Size 人数选择

```
容器:
  - display: flex
  - align-items: center
  - gap: 8px
  - justify-content: center
  - margin: 20px 0

快捷按钮 (1人 / 2人 / 3人):
  - 未选中:
    - background: #F3E8DA
    - color: #8B7355
    - border: none
    - border-radius: 20px
    - padding: 8px 20px
    - font-size: 14px, font-weight: 600
    - cursor: pointer
    - transition: all 0.2s

  - 选中:
    - background: #E8600A
    - color: #FFFFFF
    - border-radius: 20px
    - box-shadow: 0 2px 8px rgba(232, 96, 10, 0.3)

  - hover (未选中):
    - background: #EBDBC8

自定义输入框:
  - 出现在三个按钮右侧
  - width: 56px
  - text-align: center
  - border: 1.5px solid #E8D5C0
  - border-radius: 12px
  - padding: 8px 4px
  - font-family: Geist Mono
  - font-size: 14px
  - placeholder: "更多"
  - focus: border-color #E8600A, ring

  - 当输入框有值且 > 3 时:
    - 三个快捷按钮全部回到未选中态
    - 输入框 border-color: #E8600A
```

### 3. Action Buttons 操作按钮

```
容器:
  - display: grid
  - grid-template-columns: 1fr 1fr
  - gap: 12px
  - padding: 0 16px

"划走" 按钮:
  - background: #FFF0EE
  - color: #C23A2B
  - border: 1.5px solid #F0C9C4
  - border-radius: 14px
  - padding: 16px 0
  - font-size: 16px, font-weight: 700
  - 左侧带 ← 箭头图标
  - hover:
    - background: #C23A2B
    - color: #FFFFFF
    - transform: translateX(-2px)
    - transition: all 0.2s

"记下来" 按钮:
  - background: #EEFBF0
  - color: #2D7D46
  - border: 1.5px solid #B8E6C4
  - border-radius: 14px
  - padding: 16px 0
  - font-size: 16px, font-weight: 700
  - 右侧带 ♥ 图标
  - hover:
    - background: #2D7D46
    - color: #FFFFFF
    - transform: translateY(-2px)
    - transition: all 0.2s
```

---

## Animations & Micro-interactions

### Card Enter (新菜谱出现)
```css
@keyframes cardEnter {
  0%   { opacity: 0; transform: translateY(30px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
/* duration: 0.4s, ease: cubic-bezier(0.16, 1, 0.3, 1) */
```

### Swipe Away (划走动画)
```css
@keyframes swipeLeft {
  0%   { opacity: 1; transform: translateX(0) rotate(0deg); }
  100% { opacity: 0; transform: translateX(-120%) rotate(-8deg); }
}
/* duration: 0.35s, ease: ease-in */
```

### Save (记下来动画)
```css
/* 卡片轻微弹跳 + ♥ 放大 */
@keyframes saveHeart {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}
/* 同时显示 toast: "已收藏 ✓"，从底部滑入，1.5s 后淡出 */
```

### Serving Button Press
```css
/* 选中时轻微弹性缩放 */
transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
transform: scale(0.95) → scale(1);
```

---

## Loading State (AI 生成中)

```
卡片区域显示骨架屏:
  - 菜名位置: 一个 shimmer 矩形, 宽 60%, 居中
  - 食材位置: 3-4 行 shimmer 矩形, 宽度交替 (80%, 60%, 70%)
  - 步骤位置: 3-4 行 shimmer 矩形

shimmer 动画:
  - background: linear-gradient(90deg, #F3E8DA 25%, #FFF0E0 50%, #F3E8DA 75%)
  - background-size: 200% 100%
  - animation: shimmer 1.5s infinite

卡片底部显示文字: "正在想菜..." (用主色橙, 带 ... 跳动动画)
```

## Error State (AI 不可用)

```
卡片区域显示:
  - 居中图标: 🍳 (灰色/desaturated)
  - 文字: "灶台冷了，再试一次？" — 16px, #8B7355
  - 重试按钮:
    - 样式同主色按钮
    - 文字: "再来一次"
    - 带旋转刷新图标
```

---

## Responsive Breakpoints

```
Mobile (< 640px):
  - 卡片 padding: 24px 20px
  - 菜名 font-size: 30px
  - 按钮区域全宽
  - 人数选择按钮稍小: padding 6px 16px

Tablet/Desktop (≥ 640px):
  - 整体 max-width: 480px, 居中
  - 卡片 padding: 32px 28px
  - 菜名 font-size: 36px
  - 增加卡片 hover 阴影加深效果
```

---

## Save Success Toast

```
位置: 固定在屏幕底部, 居中
样式:
  - background: #2D7D46
  - color: white
  - border-radius: 24px
  - padding: 10px 24px
  - font-size: 14px, font-weight: 600
  - text: "已收藏 ✓"
  - box-shadow: 0 4px 16px rgba(45, 125, 70, 0.3)

动画:
  - 入场: 从底部滑入 + 淡入, 0.3s
  - 停留: 1.5s
  - 退场: 淡出, 0.3s
```
