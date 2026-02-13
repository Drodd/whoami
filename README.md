# 高远 — 互动叙事策划 | 个人作品集网站

一个面向**互动叙事策划 / 独立游戏开发者**的个人作品集（Portfolio）单页网站，展示 LLM 游戏原型、互动叙事实验作品以及项目经历。

## 项目概览

本项目是高远（Odd Choice）的个人作品集站点，旨在以清晰、优雅的方式呈现以下内容：

- **LLM 游戏原型**：展示基于大语言模型的语言/社会推理类游戏实验
- **互动叙事实验**：21 周连续产出的小型互动叙事游戏 Demo 及 GameJam 作品
- **项目经验**：在超参数科技、腾讯等公司的商业游戏项目经历

## 功能特性

- 响应式布局，适配桌面端与移动端
- 内嵌视频弹窗（支持 YouTube / Bilibili）
- 外链跳转至 itch.io 可玩游戏页面
- 项目卡片展示，包含标签、描述与操作按钮
- 项目经历时间线
- 联系方式展示（电话 / 微信 / 小红书）
- 下载简历按钮

## 技术栈

| 类别       | 技术                          |
| ---------- | ----------------------------- |
| 前端框架   | React 19                      |
| 开发语言   | TypeScript 5.8                |
| 构建工具   | Vite 6                        |
| CSS 方案   | Tailwind CSS（CDN 引入）      |
| 图标库     | Lucide React                  |
| 字体       | Noto Serif SC / Inter         |
| 包管理     | npm                           |

## 项目结构

```
proj_cv/
├── index.html          # HTML 入口，引入 Tailwind CDN、字体与 importmap
├── index.tsx           # React 应用挂载入口
├── App.tsx             # 主页面组件（Header / 三大内容板块 / Footer）
├── Modal.tsx           # 视频/游戏弹窗组件（iframe 嵌入）
├── data.js             # 集中管理的作品集数据（profile / sections / footer）
├── vite.config.ts      # Vite 构建配置（端口、别名、环境变量）
├── tsconfig.json       # TypeScript 编译配置
├── package.json        # 依赖与脚本
├── .env.local          # 环境变量（API Key 等）
└── .gitignore          # Git 忽略规则
```

## 架构说明

### 组件结构

```
App (主组件)
├── Header          — 姓名、头衔、副标题、下载简历按钮
├── Section 01      — LLM 实验：项目卡片网格 + 视频弹窗
├── Section 02      — 互动叙事实验：特色卡片 + 游戏卡片
├── Section 03      — 项目经验：时间线布局
├── Footer          — 个人宣言 + 联系方式
└── Modal           — 全局视频/游戏嵌入弹窗
```

### 设计模式

- **数据驱动渲染**：所有作品集内容集中存放在 `data.js` 中，组件根据数据动态渲染，修改内容无需改动组件代码
- **组件化**：`App` 为页面主体，`Modal` 为独立的弹窗组件，通过 props 传递数据
- **局部状态管理**：使用 React `useState` 管理弹窗的开关状态，无需引入额外状态管理库
- **TypeScript 类型约束**：定义 `Project`、`ExperienceItem`、`ProjectLink` 等接口，保证数据结构安全
- **Utility-first CSS**：采用 Tailwind CSS 工具类方案，快速实现响应式与视觉风格

### 视觉风格

- 极简文档式排版，以排版和留白为核心
- 中英文混排，衬线字体（Noto Serif SC）用于标题，无衬线字体（Inter）用于正文
- 细腻的交互动效（hover、fade-in 等）

## 本地运行

**前置要求：** Node.js >= 18

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认端口 3000）
npm run dev

# 3. 构建生产版本
npm run build

# 4. 预览生产构建
npm run preview
```

## 内容更新

如需更新作品集内容（项目、经历、联系方式等），只需编辑 `data.js` 文件即可，无需修改组件代码。数据结构如下：

- `profile` — 个人基本信息（姓名、头衔、工作室名）
- `sections` — 内容板块数组（LLM 实验 / 互动叙事 / 项目经验）
- `footer` — 底部宣言与联系方式

## License

&copy; 高远 • Odd Choice
