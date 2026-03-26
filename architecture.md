# 吃点啥 - 技术架构设计

## 1. 项目概述

**项目名称**：吃点啥  
**项目定位**：基于 AI 的每日家常菜谱推荐 Web 应用  
**核心价值**：根据用户喜好，利用 AI 生成个性化每日菜谱

---

## 2. 技术栈选型

### 2.1 前端技术栈

| 层次 | 技术 | 说明 |
|------|------|------|
| **框架** | Next.js 14+ (App Router) | 支持 SSR/SSG，SEO 友好，路由管理 |
| **语言** | TypeScript | 类型安全，开发体验好 |
| **UI 库** | React 18+ | 组件化开发 |
| **样式** | Tailwind CSS | 原子化 CSS，快速开发 |
| **组件库** | shadcn/ui | 高质量 UI 组件，可定制 |
| **状态管理** | Zustand | 轻量级状态管理 |
| **表单处理** | React Hook Form + Zod | 表单验证 |

### 2.2 后端技术栈

| 层次 | 技术 | 说明 |
|------|------|------|
| **API 框架** | Next.js API Routes | 与前端同构，简化部署 |
| **数据库 ORM** | Prisma | 类型安全，开发效率高 |
| **数据库** | PostgreSQL | 关系型数据库，稳定可靠 |
| **缓存** | Redis | 会话管理，热点数据缓存 |
| **认证** | NextAuth.js | 支持多种登录方式 |

### 2.3 AI 服务

| 服务 | 用途 | 说明 |
|------|------|------|
| **LLM** | Qwen（通义千问） | 菜谱生成，智能推荐 |
| **Embedding** | Qwen Embedding | 用户喜好向量化 |

### 2.4 AI 架构设计

| 层次 | 设计 | 说明 |
|------|------|------|
| **AI 组件层** | AI Service | 封装 Qwen API，统一接口 |
| **Agent 层** | Recipe Agent | 智能体模式，自主规划任务 |
| **Prompt 工程** | Prompt Templates | 结构化提示词模板库 |
| **上下文管理** | Context Manager | 管理对话历史和用户上下文 |

### 2.5 基础设施

| 服务 | 用途 | 说明 |
|------|------|------|
| **部署** | Vercel | 一键部署，全球 CDN |
| **数据库托管** | Vercel Postgres / Supabase | 托管 PostgreSQL |
| **缓存托管** | Upstash Redis | Serverless Redis |
| **监控** | Vercel Analytics | 性能监控 |
| **AI API** | 阿里云百炼平台 | Qwen API 服务 |

---

## 3. 系统架构

### 3.1 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                      用户层                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Web 端   │  │  移动端  │  │  PWA     │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   前端应用层 (Next.js)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   页面组件   │  │   UI 组件    │  │  状态管理   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   API 网关层 (Next.js API)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ 用户 API  │  │ 菜谱 API  │  │ 推荐 API  │  │ AI API │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   PostgreSQL  │ │    Redis     │ │   Qwen API   │
│   (主数据库)  │ │   (缓存层)   │ │   (AI 服务)   │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 3.2 目录结构

```
eatwhat/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证相关页面
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # 主应用页面
│   │   ├── dashboard/
│   │   ├── preferences/          # 用户喜好设置
│   │   └── recipes/              # 菜谱列表
│   ├── api/                      # API 路由
│   │   ├── auth/                 # 认证 API
│   │   ├── recipes/              # 菜谱 API
│   │   ├── preferences/          # 喜好 API
│   │   └── ai/                   # AI 相关 API
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/                   # React 组件
│   ├── ui/                       # 基础 UI 组件
│   ├── recipes/                  # 菜谱相关组件
│   ├── preferences/              # 喜好设置组件
│   └── common/                   # 通用组件
├── lib/                          # 工具库
│   ├── prisma.ts                 # Prisma 客户端
│   ├── redis.ts                  # Redis 客户端
│   ├── ai/                       # AI 服务模块
│   │   ├── index.ts              # AI 服务入口
│   │   ├── qwen.ts               # Qwen API 封装
│   │   ├── agent.ts              # AI Agent 实现
│   │   ├── prompts.ts            # 提示词模板
│   │   └── context.ts            # 上下文管理
│   └── utils.ts                  # 工具函数
├── hooks/                        # 自定义 Hooks
├── stores/                       # Zustand 状态管理
├── types/                        # TypeScript 类型定义
│   ├── ai.ts                     # AI 相关类型
│   ├── agent.ts                  # Agent 相关类型
│   └── index.ts                  # 类型导出
├── agents/                       # AI Agent 模块
│   ├── base.ts                   # Agent 基类
│   ├── recipe-agent.ts           # 菜谱生成 Agent
│   └── types.ts                  # Agent 类型定义
├── prompts/                      # 提示词模板
│   ├── recipe.ts                 # 菜谱生成提示词
│   ├── system.ts                 # 系统提示词
│   └── index.ts                  # 模板导出
├── prisma/                       # Prisma 配置
│   ├── schema.prisma             # 数据库模型
│   └── migrations/               # 数据库迁移
├── public/                       # 静态资源
├── .env                          # 环境变量
├── next.config.js                # Next.js 配置
├── tailwind.config.js            # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 依赖配置
```

---

## 4. 数据模型设计

### 4.1 核心实体

```prisma
// 用户
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  preferences   UserPreference?
  recipes       UserRecipe[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// 用户喜好
model UserPreference {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  dietaryRestrictions String[]  // 饮食限制：素食、无麸质等
  favoriteIngredients String[]  // 喜欢的食材
  dislikedIngredients String[]  // 不喜欢的食材
  favoriteCuisines    String[]  // 喜欢的菜系
  spiceLevel      String   // 辣度偏好：mild/medium/hot
  cookingTime     Int      // 期望烹饪时间（分钟）
  servings        Int      // 人数
  budgetLevel     String   // 预算等级：low/medium/high
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// 菜谱
model Recipe {
  id              String   @id @default(cuid())
  name            String
  description     String
  ingredients     Json     // 食材列表
  instructions    Json     // 步骤
  prepTime        Int      // 准备时间
  cookTime        Int      // 烹饪时间
  servings        Int      // 份量
  difficulty      String   // 难度：easy/medium/hard
  cuisine         String   // 菜系
  tags            String[] // 标签
  calories        Int?     // 卡路里
  imageUrl        String?
  source          String   // 来源：ai/user
  createdBy       String?  // 创建者 ID
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// 用户菜谱（收藏/计划）
model UserRecipe {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  recipeId        String
  recipe          Recipe   @relation(fields: [recipeId], references: [id])
  type            String   // 类型：favorite/plan/history
  scheduledDate   DateTime? // 计划日期
  rating          Int?     // 评分
  note            String?  // 备注
  createdAt       DateTime @default(now())
  
  @@unique([userId, recipeId, type])
}

// AI 生成历史
model GenerationHistory {
  id              String   @id @default(cuid())
  userId          String
  prompt          String   // 提示词
  response        Json     // AI 响应
  tokensUsed      Int      // 消耗 token 数
  createdAt       DateTime @default(now())
}
```

---

## 5. API 设计

### 5.1 RESTful API 规范

**基础路径**: `/api/v1`

### 5.2 核心 API

#### 认证相关
```
POST   /api/auth/signin          # 登录
POST   /api/auth/signout         # 登出
GET    /api/auth/session         # 获取会话
POST   /api/auth/register        # 注册
```

#### 用户喜好
```
GET    /api/preferences          # 获取用户喜好
PUT    /api/preferences          # 更新用户喜好
```

#### 菜谱管理
```
GET    /api/recipes              # 获取菜谱列表
GET    /api/recipes/:id          # 获取菜谱详情
POST   /api/recipes              # 创建菜谱
DELETE /api/recipes/:id          # 删除菜谱
POST   /api/recipes/:id/favorite # 收藏菜谱
```

#### AI 生成
```
POST   /api/ai/generate-daily    # 生成每日菜谱
POST   /api/ai/generate-random   # 随机生成菜谱
POST   /api/ai/suggest           # 智能推荐
```

---

## 6. 核心功能流程

### 6.1 AI 菜谱生成流程

```
1. 用户点击"生成今日菜谱"
        ↓
2. 前端调用 /api/ai/generate-daily
        ↓
3. 后端获取用户喜好 (UserPreference)
        ↓
4. AI Service 构建提示词 (Prompt Engineering)
        ↓
5. 调用 Qwen API 生成菜谱
        ↓
6. 解析 AI 响应，存入数据库
        ↓
7. 返回菜谱给前端展示
```

### 6.2 AI Agent 架构

```
┌─────────────────────────────────────┐
│         Recipe Agent                │
│  ┌─────────────────────────────┐   │
│  │  Planner (规划器)            │   │
│  │  - 分析用户偏好              │   │
│  │  - 制定生成策略              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Executor (执行器)           │   │
│  │  - 调用 Qwen API             │   │
│  │  - 解析响应                  │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Validator (验证器)          │   │
│  │  - 验证输出格式              │   │
│  │  - 确保数据完整性            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 6.3 提示词设计示例

#### 系统提示词
```
你是一位专业营养师和厨师，擅长根据用户喜好创建家常菜谱。
请使用中文回复，确保菜谱实用、易操作。
```

#### 用户偏好提示词
```
请根据以下用户偏好生成一份家常菜谱：

用户偏好：
- 饮食限制：{dietaryRestrictions}
- 喜欢的食材：{favoriteIngredients}
- 不喜欢的食材：{dislikedIngredients}
- 菜系偏好：{favoriteCuisines}
- 辣度：{spiceLevel}
- 烹饪时间：{cookingTime}分钟
- 人数：{servings}人

请生成一份包含以下信息的菜谱（JSON 格式）：
{
  "name": "菜名",
  "description": "简介",
  "ingredients": [{"name": "食材", "amount": "用量"}],
  "instructions": ["步骤 1", "步骤 2"],
  "prepTime": 准备时间，
  "cookTime": 烹饪时间，
  "difficulty": "难度",
  "cuisine": "菜系",
  "calories": 卡路里
}
```

---

## 7. 安全设计

### 7.1 认证与授权
- 使用 NextAuth.js 实现认证
- 支持邮箱密码登录、第三方登录（Google/微信）
- JWT Token 管理会话
- API 路由中间件验证用户身份

### 7.2 数据安全
- 密码 bcrypt 加密存储
- 敏感信息环境变量管理
- API 速率限制（upstash/ratelimit）
- CORS 配置

### 7.3 AI 成本控制
- Token 使用监控
- 生成频率限制
- 响应缓存（相似请求复用）
- Qwen API 调用优化（批量请求、流式响应）

### 7.4 AI 组件化设计
- **接口抽象**：统一的 AI Service 接口
- **可插拔**：支持切换不同 LLM 提供商
- **Agent 模式**：支持智能体自主决策
- **扩展性**：易于添加新的 AI 功能模块

---

## 8. 性能优化

### 8.1 前端优化
- Next.js 静态生成 (SSG) 用于静态页面
- 增量静态生成 (ISR) 用于菜谱详情
- 图片优化（next/image）
- 代码分割与懒加载

### 8.2 后端优化
- Redis 缓存热门菜谱
- 数据库索引优化
- 批量操作优化
- API 响应压缩

### 8.3 AI 优化
- 提示词模板化
- 响应结果缓存（7 天）
- 批量生成减少 API 调用
- 流式响应提升用户体验
- Agent 任务并行化

---

## 9. 部署架构

### 9.1 开发环境
```
本地开发 → Git 推送 → GitHub
```

### 9.2 生产环境
```
GitHub → Vercel 自动部署
           ├─→ Vercel Postgres
           ├─→ Upstash Redis
           └─→ 阿里云百炼 (Qwen API)
```

### 9.3 CI/CD 流程
```
1. 代码提交到 main 分支
2. Vercel 自动触发构建
3. 运行测试
4. 自动部署到生产环境
5. 发送部署通知
```

---

## 10. 监控与日志

### 10.1 应用监控
- Vercel Analytics - 页面性能
- Vercel Speed Insights - 用户体验指标

### 10.2 错误监控
- Sentry - 错误追踪
- 自定义错误日志

### 10.3 业务监控
- AI Token 使用量
- 用户活跃度
- 菜谱生成次数
- Agent 任务执行情况
- Qwen API 调用成功率

---

## 11. 开发路线图

### Phase 1 - MVP (2-3 周)
- [ ] 项目初始化
- [ ] 用户认证系统
- [ ] 基础 UI 框架
- [ ] AI 菜谱生成功能
- [ ] 菜谱展示页面

### Phase 2 - 核心功能 (2-3 周)
- [ ] 用户喜好设置
- [ ] 菜谱收藏功能
- [ ] 每日菜谱计划
- [ ] 搜索与筛选

### Phase 3 - 优化迭代 (持续)
- [ ] PWA 支持
- [ ] 社交分享
- [ ] 用户评价系统
- [ ] 智能推荐优化
- [ ] AI Agent 功能增强
- [ ] 多模态 AI（图片识别食材）

---

## 12. 技术决策说明

### 为什么选择 Next.js？
- 全栈能力，前后端同构
- 优秀的开发体验
- Vercel 一键部署
- SEO 友好

### 为什么选择 Prisma？
- 类型安全
- 自动迁移
- 开发效率高
- 社区活跃

### 为什么选择 Serverless 架构？
- 按需付费，成本低
- 自动扩展
- 无需运维
- 全球 CDN

### 为什么选择 Qwen？
- 中文理解能力强
- 成本效益高
- API 稳定可靠
- 支持长上下文
- 阿里云生态支持

### 为什么采用 AI 组件化设计？
- 解耦 AI 服务与业务逻辑
- 便于未来扩展为智能体架构
- 支持多 LLM 提供商切换
- 提高代码可维护性和可测试性

---

## 13. 环境变量配置

```bash
# 数据库
DATABASE_URL="postgresql://..."

# Redis
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."

# 认证
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI 服务
QWEN_API_KEY="sk-..."
QWEN_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"

# 其他
NEXT_PUBLIC_APP_URL="https://eatwhat.app"
```

---

*最后更新：2026-03-21*

---

## 附录：AI 组件化设计详解

### A.1 AI Service 接口设计

```typescript
// lib/ai/index.ts
interface AIService {
  generate(prompt: string, options?: GenerationOptions): Promise<AIResponse>;
  generateStream(prompt: string, options?: GenerationOptions): AsyncIterable<string>;
  embed(text: string): Promise<number[]>;
}

// 实现 Qwen AI Service
class QwenService implements AIService {
  private apiKey: string;
  private baseUrl: string;
  
  async generate(prompt: string, options?: GenerationOptions): Promise<AIResponse> {
    // 调用 Qwen API
  }
  
  async generateStream(prompt: string): AsyncIterable<string> {
    // 流式响应
  }
  
  async embed(text: string): Promise<number[]> {
    // 向量化
  }
}
```

### A.2 Agent 架构设计

```typescript
// agents/base.ts
abstract class BaseAgent {
  protected aiService: AIService;
  protected contextManager: ContextManager;
  
  abstract plan(input: AgentInput): Promise<AgentPlan>;
  abstract execute(plan: AgentPlan): Promise<AgentResult>;
  abstract validate(result: AgentResult): Promise<boolean>;
  
  async run(input: AgentInput): Promise<AgentResult> {
    const plan = await this.plan(input);
    const result = await this.execute(plan);
    const isValid = await this.validate(result);
    
    if (!isValid) {
      throw new Error('Agent result validation failed');
    }
    
    return result;
  }
}

// agents/recipe-agent.ts
class RecipeAgent extends BaseAgent {
  async plan(input: RecipeInput): Promise<RecipePlan> {
    // 分析用户偏好，制定生成策略
    return {
      prompt: this.buildPrompt(input),
      temperature: 0.7,
      maxTokens: 2000
    };
  }
  
  async execute(plan: RecipePlan): Promise<RecipeResult> {
    // 调用 Qwen API 生成菜谱
    const response = await this.aiService.generate(plan.prompt);
    return this.parseResponse(response);
  }
  
  async validate(result: RecipeResult): Promise<boolean> {
    // 验证菜谱数据完整性
    return !!(result.name && result.ingredients && result.instructions);
  }
}
```

### A.3 提示词模板管理

```typescript
// prompts/recipe.ts
export const RECIPE_SYSTEM_PROMPT = `你是一位专业营养师和厨师，擅长根据用户喜好创建家常菜谱。
请使用中文回复，确保菜谱实用、易操作。`;

export const RECIPE_USER_PROMPT = `请根据以下用户偏好生成一份家常菜谱：

用户偏好：
- 饮食限制：{dietaryRestrictions}
- 喜欢的食材：{favoriteIngredients}
- 不喜欢的食材：{dislikedIngredients}
- 菜系偏好：{favoriteCuisines}
- 辣度：{spiceLevel}
- 烹饪时间：{cookingTime}分钟
- 人数：{servings}人

请生成一份包含以下信息的菜谱（JSON 格式）：
{outputSchema}`;

// 提示词渲染函数
export function renderRecipePrompt(preferences: UserPreference): string {
  return RECIPE_USER_PROMPT
    .replace('{dietaryRestrictions}', preferences.dietaryRestrictions.join(', '))
    .replace('{favoriteIngredients}', preferences.favoriteIngredients.join(', '))
    // ... 其他替换
    .replace('{outputSchema}', JSON.stringify(recipeSchema, null, 2));
}
```

### A.4 上下文管理器

```typescript
// lib/ai/context.ts
class ContextManager {
  private maxContextLength: number;
  private conversationHistory: Message[];
  
  addMessage(role: 'user' | 'assistant', content: string): void {
    this.conversationHistory.push({ role, content });
    this.trimIfNeeded();
  }
  
  getContext(): Message[] {
    return this.conversationHistory;
  }
  
  private trimIfNeeded(): void {
    // 当上下文超出限制时，移除最早的消息
    while (this.calculateTokenCount() > this.maxContextLength) {
      this.conversationHistory.shift();
    }
  }
  
  private calculateTokenCount(): number {
    // 估算 token 数量
    return this.conversationHistory.reduce((acc, msg) => {
      return acc + Math.ceil(msg.content.length / 4);
    }, 0);
  }
}
```

### A.5 未来智能体扩展方向

1. **多 Agent 协作**
   - 营养分析 Agent：分析菜谱营养成分
   - 成本控制 Agent：优化食材成本
   - 口味匹配 Agent：学习用户口味偏好

2. **自主学习能力**
   - 用户反馈学习
   - 菜谱评分优化
   - 个性化推荐增强

3. **工具使用能力**
   - 搜索网络菜谱
   - 计算食材用量
   - 生成购物清单
