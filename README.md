# TvTa UI - 现代化跨平台桌面应用模板

👋 欢迎使用 **TvTa UI**！这是一个专为小白和全栈开发者设计的现代化桌面应用模板。无论你是使用 macOS 还是 Windows，都可以通过本项目快速构建出一个美观、功能强大的桌面软件。

本项目基于最新的 **Tauri 2.0**（高性能、小体积）、**Vue 3**（易上手的前端框架）和 **Naive UI**（高颜值组件库）构建。

---

## ✨ 核心亮点

*   🖥️ **跨平台支持**: 完美支持 macOS (M1/Intel) 和 Windows 10/11。
*   🎨 **高颜值 UI**: 内置 Naive UI + UnoCSS，提供深色/浅色模式一键切换。
*   🧩 **多布局系统**: 支持“侧边栏导航”和“顶部导航”两种布局，可随时切换。
*   🌍 **国际化支持**: 内置中英文切换功能，支持自动跟随系统或手动设置。
*   🛠️ **系统级能力**: 已封装关机、重启、WiFi 控制、蓝牙设置、开机自启等系统底层功能。
*   🔌 **后端对接**: 内置 Axios 网络请求封装，开箱即用，轻松对接 Spring Boot 等后端。

---

## 🛠️ 环境准备 (小白必读)

在开始之前，请确保你的电脑上安装了以下基础软件。

### 1. 安装 Node.js (前端运行环境)
*   **下载地址**: [Node.js 官网](https://nodejs.org/)
*   **推荐版本**: 下载 **LTS (长期支持版)**，例如 v18 或 v20。
*   **验证**: 打开终端(Mac)或CMD(Win)，输入 `node -v`，出现版本号即成功。

### 2. 安装 Rust (Tauri 核心依赖)
Tauri 依赖 Rust 语言环境进行打包构建。

#### 🍎 macOS 用户
打开终端 (Terminal)，复制以下命令并回车：
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
安装完成后，**重启终端**，输入 `rustc --version` 验证。

#### 🪟 Windows 用户
1.  访问 [Rust 官网安装页面](https://www.rust-lang.org/tools/install)。
2.  下载 `RUSTUP-INIT.EXE` (64位) 并运行。
3.  按照提示一路回车安装（需要安装 Visual Studio C++ 生成工具，安装程序会自动提示）。
4.  安装完成后，打开 CMD 或 PowerShell，输入 `rustc --version` 验证。

### 3. 安装包管理器 pnpm (推荐)
本项目推荐使用 `pnpm`，因为它比 npm 更快更省空间。
```bash
npm install -g pnpm
```

---

## 🚀 快速启动

### 第一步：下载项目并进入目录
如果你已经下载了解压包，请直接在终端进入该文件夹：
```bash
cd tvta-ui
```

### 第二步：安装依赖
这一步会下载所有需要的第三方库（Vue, Naive UI 等）。
```bash
pnpm install
```
*(如果网络不好，可能会慢一些，请耐心等待)*

### 第三步：启动开发模式
这一步会启动一个本地窗口，你可以实时看到修改的效果。
```bash
pnpm tauri dev
```
🎉 **成功！** 你应该能看到一个名为 "TvTa UI" 的应用窗口弹出来了。

---

## 📦 打包发布

想把做好的软件发给朋友用？只需要一个命令！

### macOS 打包 (生成 .dmg / .app)
```bash
pnpm tauri build
```
生成的安装包在：`src-tauri/target/release/bundle/dmg/`

### Windows 打包 (生成 .exe / .msi)
```bash
pnpm tauri build
```
生成的安装包在：`src-tauri/target/release/bundle/nsis/`

---

## 🔌 功能使用指南

### 1. 切换布局
点击顶部导航栏的 **"布局切换"** 图标（类似网页模板的图标），可以在“侧边栏模式”和“顶部菜单模式”之间无缝切换。

### 2. 多语言切换
点击顶部导航栏的 **"地球仪"** 图标，可以切换 **简体中文** 和 **English**。

### 3. 系统功能测试
进入左侧菜单的 **"系统方法测试"** 页面，你可以尝试：
*   🔒 **锁定屏幕**
*   📡 **开关 WiFi** (需管理员权限)
*   🔊 **调节音量** (目前主要支持 macOS)
*   🚀 **设置开机自启**

### 4. 对接后端接口
打开 `src/utils/request.ts` 文件，修改 `baseURL` 为你的后端地址：
```typescript
const service = axios.create({
  baseURL: 'http://localhost:8080', // 修改这里，例如 'https://api.myapp.com'
  timeout: 5000
})
```

---

## ❓ 常见问题 (Q&A)

**Q: 启动时报错 `failed to get serde` 或网络连接错误？**
A: 这通常是国内网络连接 Rust 官方源 (crates.io) 慢导致的。
**解决方法**: 我们已经为你配置了中科大 (USTC) 镜像源。如果仍有问题，请检查你的网络代理设置，或者尝试在终端运行 `unset https_proxy` 关闭代理。

**Q: Windows 上提示缺少 "WebView2"？**
A: Windows 10/11 通常自带 WebView2。如果是旧版系统，Tauri 安装程序会自动提示用户下载安装，无需担心。

**Q: 为什么有些系统功能（如关机）点击没反应？**
A: 在开发模式 (`pnpm tauri dev`) 下，系统权限可能受限。请尝试打包后安装运行，或者以管理员身份运行终端。

---

## 📂 项目结构一览

```
tvta-ui/
├── src/
│   ├── components/      # 公共组件 (布局切换器、语言切换器等)
│   ├── layouts/         # 布局文件 (MainLayout, TopMenuLayout)
│   ├── locales/         # 多语言文件 (zh-CN.ts, en.ts)
│   ├── stores/          # 状态管理 (Pinia)
│   ├── sys-methods/     # 系统底层方法封装 (电源、网络等)
│   ├── views/           # 页面文件
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── src-tauri/           # Rust 后端代码 (配置、权限、图标)
└── package.json         # 项目配置
```

---

**Happy Coding! 祝你开发愉快！** 🚀
