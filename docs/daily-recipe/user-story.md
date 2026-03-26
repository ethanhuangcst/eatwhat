# 每日菜谱 (Daily Recipe)

## User Stories

### US-1: 获取随机菜谱
```
As a 家庭用户 (home cook)
I want to 打开每日菜谱页面，获得一个随机的家常菜谱
So that 我不用纠结今天吃什么，快速决定一道菜
```

### US-2: 选择用餐人数
```
As a 家庭用户 (home cook)
I want to 设定用餐人数，让菜谱的食材用量匹配实际需求
So that 我不会买多或买少食材
```

## Acceptance Criteria

### Feature: 每日菜谱页面

#### Scenario: 打开页面后展示随机菜谱（默认两人食）
```gherkin
Scenario: 用户打开每日菜谱页面
  Given 用户已打开"吃点啥"应用
  When 用户进入"每日菜谱"页面
  Then 页面展示一个随机生成的家常菜谱
  And 默认用餐人数为两人食
  And 菜谱包含菜名、食材清单、烹饪步骤
  And 食材用量按两人食份量显示
```

#### Scenario: 通过快捷按钮切换人数
```gherkin
Scenario: 用户通过按钮选择一人食
  Given 页面正在展示一个菜谱
  And 当前人数为两人食
  When 用户点击"一人食"按钮
  Then 用餐人数切换为一人食
  And 菜谱的食材用量按一人份重新生成

Scenario: 用户通过按钮选择三人食
  Given 页面正在展示一个菜谱
  And 当前人数为两人食
  When 用户点击"三人食"按钮
  Then 用餐人数切换为三人食
  And 菜谱的食材用量按三人份重新生成
```

#### Scenario: 通过输入框设定更多人数
```gherkin
Scenario: 用户输入自定义人数
  Given 页面正在展示一个菜谱
  When 用户在人数输入框中输入数字（如 5）
  Then 用餐人数切换为五人食
  And 菜谱的食材用量按五人份重新生成

Scenario: 用户输入无效人数
  Given 页面正在展示一个菜谱
  When 用户在人数输入框中输入无效值（如 0 或负数）
  Then 页面提示"请输入有效人数"
  And 人数保持不变
```

#### Scenario: 用户记下菜谱
```gherkin
Scenario: 用户点击"记下来"保存菜谱
  Given 页面正在展示一个菜谱
  When 用户点击"记下来"
  Then 当前菜谱（含当前人数的食材用量）被保存到用户的收藏列表
  And 用户收到保存成功的反馈
  And 页面展示下一个随机菜谱
```

#### Scenario: 用户划走菜谱
```gherkin
Scenario: 用户点击"划走"跳过菜谱
  Given 页面正在展示一个菜谱
  When 用户点击"划走"
  Then 当前菜谱被跳过
  And 页面展示下一个随机菜谱
```

#### Scenario: 菜谱由 AI 生成
```gherkin
Scenario: 菜谱内容通过 AI 生成
  Given 用户进入"每日菜谱"页面
  And 用餐人数已设定
  When 系统请求生成菜谱
  Then 系统调用 AI（Qwen）生成一道家常菜谱
  And 菜谱包含菜名
  And 菜谱包含对应人数的食材及用量
  And 菜谱包含分步烹饪说明
```

#### Scenario: AI 服务不可用时的降级处理
```gherkin
Scenario: AI 服务暂时不可用
  Given 用户进入"每日菜谱"页面
  And AI 服务不可用
  When 系统请求生成菜谱
  Then 页面展示友好的错误提示
  And 用户可以点击重试
```

## 人数选择交互说明

- **快捷按钮**：一人食 / 两人食（默认选中）/ 三人食
- **输入框**：当用户需要更多人数时，可直接输入数字
- 切换人数后，当前菜谱的食材用量随之更新

## 菜谱内容结构

每个菜谱应包含：
- **菜名**：家常菜名称
- **食材清单**：按当前人数的食材及用量
- **烹饪步骤**：分步说明
