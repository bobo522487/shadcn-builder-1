# Shadcn Builder

![Shadcn Builder](https://www.shadcn-builder.com/og-image.png)

Shadcn Builder 是一个面向 [shadcn/ui](https://ui.shadcn.com/) 的可视化表单构建器，提供所见即所得的拖拽式编辑体验，能够在数秒内导出生产可用的 React + Tailwind CSS 代码。

---

## 核心功能

- 拖拽式画布：使用 `@dnd-kit` 完成组件的拖拽、排序与栅格布局调整
- 实时预览：在编辑器和导出的渲染器间共享同一份 schema，始终保证所见即所得
- 模板加载：支持 URL 模板参数和远程模板仓库，一键加载常用表单
- 代码导出：生成带类型的 React 组件和 Tailwind Class，支持按视口覆盖样式
- 多端响应：内置 `sm/md/lg` 视口切换，利用 overrides 存储不同尺寸的属性
- 账号与数据：使用 Clerk 完成认证，Convex 负责表单 schema 的存储与历史记录

---

## 代码结构

```text
.
├── src
│   ├── app                # Next.js 16 App Router 页面（登陆页、/builder、模板库等）
│   ├── components         # 表单构建器、登陆页和 UI Shell 组件
│   ├── hooks              # 授权、模板加载、视口等自定义 Hook
│   ├── lib                # 通用工具、历史记录管理、Tailwind 工具函数
│   ├── models             # 表单组件模型与属性封装
│   └── stores             # 基于 zustand 的全局状态（组件栈、历史记录等）
├── packages
│   ├── designer           # 可独立使用的设计器组件包
│   └── renderer           # 根据 schema 渲染 shadcn 组件的渲染器
├── convex                 # Convex 云函数（表单 CRUD、验证器）
├── apps/playground        # 内部测试用的 Playground App
└── components.json        # shadcn/ui 组件生成配置
```

---

## 关键模块

- 表单编辑页（`src/app/builder/page.tsx`）：组合左右侧边栏、主画布、导出弹窗以及欢迎弹窗，处理拖拽传感器、模板加载和视口切换逻辑。
- 表单状态仓库（`src/stores/form-builder-store.ts`）：使用 zustand 管理组件列表、栅格布局、视口 overrides、撤销重做历史等。
- 模型与类型（`src/models/FormComponent.ts`、`src/types`）：统一描述支持的字段组件、属性、校验规则与 Tailwind 样式。
- 渲染器（`packages/renderer`）：暴露 `<Renderer />` 与组件注册表，将 schema 映射到 shadcn/ui 实例。
- 设计器包（`packages/designer`）：抽离的设计器控件（左右面板、命令系统、网格工具），为宿主应用提供更细粒度的集成。
- 后端服务（`convex/forms.ts`）：定义表单的查询与写入接口，借助 `formComponentsSchema` 做 schema 校验，并与 Clerk 认证信息绑定。

---

## 快速开始

1. 安装依赖（推荐使用 pnpm）
   ```bash
   pnpm install
   ```
2. 配置环境变量：复制 `.env.local`，替换为自己的 Clerk、Convex 与 PostHog 配置。
3. 启动 Convex 开发服务（可选，若需持久化）
   ```bash
   pnpm dlx convex dev
   ```
4. 启动 Next.js 应用
   ```bash
   pnpm dev
   ```

常用命令：

- `pnpm build`：生产构建
- `pnpm start`：启动生产服务器
- `pnpm test`：运行 Vitest 单元测试
- `pnpm lint`：执行 ESLint 检查

---

## 贡献指南

欢迎提交 Issue 或 Pull Request：

1. Fork 本仓库并新建分支（`git checkout -b feature/feature-name`）
2. 完成修改并保持提交清晰
3. 提交 PR 前确认通过 `pnpm lint` 与必要测试

---

## 许可证

MIT License © 2025 [Shadcn Builder](https://www.shadcn-builder.com/?utm_source=github&utm_content=README)
