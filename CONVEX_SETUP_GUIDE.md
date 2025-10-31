# Convex 后端配置指南

## 当前状态
- ✅ Clerk 认证已配置
- ⏳ Convex 后端待配置

## 配置步骤

### 第一步：登录并初始化 Convex

在终端中运行以下命令：

```bash
cd /home/bobo/shadcn-builder
npx convex dev
```

**重要提示**：
- 这会打开浏览器让你登录（使用 GitHub/Google 账号）
- 如果是首次使用，会创建新的 Convex 项目
- 部署完成后，终端会显示你的 Convex URL（类似 `https://xxx.convex.cloud`）
- **请复制这个 URL**

### 第二步：获取 Clerk JWT Issuer Domain

1. 访问 [Clerk Dashboard](https://dashboard.clerk.com/)
2. 选择你的应用
3. 进入 `Configure` → `JWT Templates`
4. 如果还没有名为 `convex` 的模板：
   - 点击 `New template`
   - Template name: **`convex`**（必须完全一致）
   - 记录显示的 **Issuer** 域名（类似 `https://xxx.clerk.accounts.dev`）
   - 保存模板
5. 如果已有 `convex` 模板：
   - 直接查看 Issuer 域名

### 第三步：配置 Convex Dashboard 环境变量

1. 访问 [Convex Dashboard](https://dashboard.convex.dev/)
2. 选择你的项目
3. 进入 `Settings` → `Environment Variables`
4. 添加环境变量：
   - **Name**: `CLERK_JWT_ISSUER_DOMAIN`
   - **Value**: 从 Clerk 复制的完整 Issuer URL（如 `https://xxx.clerk.accounts.dev`）
   - 点击 `Add`

### 第四步：更新本地 `.env.local` 文件

打开 `.env.local` 文件，更新以下内容：

```env
# Clerk Authentication (已配置)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_你的密钥
CLERK_SECRET_KEY=sk_test_你的密钥

# Convex Backend - 使用第一步获取的 URL
NEXT_PUBLIC_CONVEX_URL=https://你的项目名称.convex.cloud
CONVEX_DEPLOYMENT=https://你的项目名称.convex.cloud

# Clerk JWT Issuer - 使用第二步获取的域名
CLERK_JWT_ISSUER_DOMAIN=https://你的项目.clerk.accounts.dev

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 第五步：验证配置

1. 重启开发服务器：
```bash
# 停止当前服务器 (Ctrl+C)
yarn dev
```

2. 同时保持 Convex 开发模式运行（在另一个终端）：
```bash
npx convex dev
```

3. 测试功能：
   - 访问 `http://localhost:3000/sign-up` 注册账号
   - 登录后访问 `http://localhost:3000/builder`
   - 创建表单并保存，检查是否能正常保存

## 当前需要修复的问题

根据环境变量检查，发现：
- ❌ `NEXT_PUBLIC_CONVEX_URL` 当前设置为 Clerk 域名，需要改为 Convex URL
- ❌ `CONVEX_DEPLOYMENT` 当前设置为 Clerk 域名，需要改为 Convex URL
- ❌ 缺少 `CLERK_JWT_ISSUER_DOMAIN` 环境变量

请在完成第一步获取 Convex URL 后，更新 `.env.local` 文件。

