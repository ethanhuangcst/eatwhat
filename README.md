# 吃点啥 - EatWhat

基于 AI 的每日家常菜谱推荐 Web 应用

## 🍳 项目简介

吃点啥是一个根据用户喜好，利用 AI 生成个性化每日菜谱的 Web 应用。

### 核心功能

- ✨ 基于用户喜好的 AI 菜谱生成
- 🎯 个性化饮食偏好设置
- 📅 每日菜谱计划
- ⭐ 菜谱收藏与评分
- 🤖 AI 智能体架构，支持未来扩展

## 🛠️ 技术栈

### 前端

- **框架**: Next.js 15+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件**: 自定义组件（基于 shadcn/ui 设计理念）
- **状态管理**: Zustand

### 后端

- **API**: Next.js API Routes
- **数据库**: PostgreSQL + Prisma ORM
- **缓存**: Redis (Upstash)
- **认证**: NextAuth.js

### AI 服务

- **LLM**: Qwen（通义千问）via 阿里云百炼
- **架构**: 组件化 AI Service + Agent 模式

### 基础设施

- **部署**: Vercel
- **数据库托管**: Vercel Postgres / Supabase
- **缓存托管**: Upstash Redis

## 🚀 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库
- Qwen API Key（阿里云百炼）

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/ethanhuangcst/eatwhat.git
cd eatwhat
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env` 并填写配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填写必要的配置：

```env
# 数据库
DATABASE_URL="postgresql://..."

# Redis（可选，开发环境使用内存缓存）
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."

# 认证
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI 服务
QWEN_API_KEY="sk-your-api-key"
QWEN_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
```

4. **初始化数据库**

```bash
npx prisma generate
npx prisma db push
```

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
eatwhat/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API 路由
│   │   └── page.tsx      # 首页
│   ├── components/       # React 组件
│   │   ├── ui/           # 基础 UI 组件
│   │   ├── recipes/      # 菜谱组件
│   │   └── preferences/  # 偏好设置组件
│   ├── lib/              # 工具库
│   │   ├── ai/           # AI 服务模块
│   │   ├── prisma.ts     # Prisma 客户端
│   │   └── redis.ts      # Redis 客户端
│   ├── agents/           # AI Agent 模块
│   │   ├── base.ts       # Agent 基类
│   │   └── recipe-agent.ts # 菜谱生成 Agent
│   ├── prompts/          # 提示词模板
│   ├── types/            # TypeScript 类型
│   └── hooks/            # 自定义 Hooks
├── prisma/
│   └── schema.prisma     # 数据库模型
└── .env.example          # 环境变量示例
```

## 🤖 AI 架构

### AI Service

封装 Qwen API，提供统一的接口：

```typescript
import { getAIService } from '@/lib/ai';

const aiService = getAIService();
const response = await aiService.generate(prompt);
```

### Recipe Agent

菜谱生成智能体，包含三个核心组件：

1. **Planner（规划器）**: 分析用户偏好，制定生成策略
2. **Executor（执行器）**: 调用 Qwen API 生成菜谱
3. **Validator（验证器）**: 验证输出格式和数据完整性

## 📊 数据库模型

核心实体：

- **User**: 用户
- **UserPreference**: 用户喜好设置
- **Recipe**: 菜谱
- **UserRecipe**: 用户菜谱（收藏/计划）
- **GenerationHistory**: AI 生成历史

详细模型定义请查看 [`prisma/schema.prisma`](prisma/schema.prisma)

## 🔧 开发

### 可用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 数据库操作
npx prisma studio        # 打开 Prisma Studio
npx prisma db push       # 推送 schema 到数据库
npx prisma migrate dev   # 开发环境迁移
npx prisma generate      # 生成 Prisma 客户端
```

## 📄 架构文档

详细的架构设计请查看 [architecture.md](architecture.md)

## 🗺️ 开发路线图

### Phase 1 - MVP (2-3 周)

- [x] 项目初始化
- [x] 技术架构设计
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

## 🤝 贡献

欢迎贡献！请查看 [architecture.md](architecture.md) 了解项目架构。

## 📝 License

MIT

## 👤 作者

Ethan Huang - [@ethanhuangcst](https://github.com/ethanhuangcst)

---

**吃点啥** - 让每天的美食选择变得简单！🍽️
