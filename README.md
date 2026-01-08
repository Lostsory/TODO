# Mac Desktop Todo

一个基于 **Electron + React + Tailwind CSS** 开发的macOS菜单栏Todo应用，点击顶部菜单栏图标展开/隐藏面板。

## ✨ 功能特性

- ✅ **基础功能**：添加、编辑、删除、标记完成待办事项
- 💾 **数据持久化**：自动保存到本地JSON文件
- 🖥️ **菜单栏应用**：只在顶部菜单栏显示图标，不在Dock中显示
- 🎯 **智能定位**：点击图标，面板精准展开在图标正下方
- 🚫 **点击外部隐藏**：点击空白区域自动隐藏面板
- ⚡ **开机自启动**：支持开机自动启动，后台运行
- 🎨 **现代化UI**：使用Tailwind CSS 3.4设计的简洁界面
- 📊 **统计信息**：实时显示待办事项数量和完成进度
- 🔍 **筛选视图**：支持查看全部、进行中、已完成的待办
- 🖱️ **右键退出**：右键点击菜单栏图标显示退出菜单

## 📝 更新日志

### v1.0.0 (2025-01-08)
- ✨ 初始版本发布
- ✅ 支持添加、编辑、删除、标记完成待办事项
- 🖥️ 菜单栏应用设计，不在Dock中显示
- 🎯 智能窗口定位，精准展开在菜单栏图标下方
- 🚫 点击外部自动隐藏面板
- ⚡ 开机自启动功能（仅生产环境）
- 🔍 支持全部、进行中、已完成筛选视图
- 🖱️ 左键点击显示/隐藏面板，右键点击显示退出菜单

## 📦 下载安装

### 方式1：使用DMG安装包（推荐）

从 [GitHub Releases](https://github.com/Lostsory/TODO/releases) 页面下载适合你Mac的安装包：

- **Mac Desktop Todo-1.0.0-arm64.dmg** - 适用于 Apple Silicon 芯片的 Mac
- **Mac Desktop Todo-1.0.0.dmg** - 适用于 Intel 芯片的 Mac

**安装步骤：**
1. 下载 `.dmg` 文件
2. 双击打开DMG文件
3. 将 "Mac Desktop Todo" 拖拽到 Applications 文件夹
4. 打开 "系统设置" → "通用" → "登录项"，确认 "Mac Desktop Todo" 已启用
5. 点击顶部菜单栏的图标开始使用

### 方式2：从源码安装

```bash
# 克隆仓库
git clone <repository-url>
cd mac-todo

# 安装依赖
pnpm install

# 打包应用
pnpm dist

# 安装生成的 .app 文件
open release/mac-universal/Mac Desktop Todo.app
```

## 🛠️ 技术栈

- **Electron 28** - 桌面应用框架
- **React 19** - UI框架
- **Vite 7** - 快速构建工具
- **Tailwind CSS 3.4** - 实用优先的CSS框架
- **Node.js** - 后端运行时

## 📁 项目结构

```
mac-todo/
├── src/
│   ├── components/           # React组件
│   │   ├── AddTodo.jsx      # 添加待办组件
│   │   ├── FilterBar.jsx    # 筛选栏组件
│   │   ├── TodoItem.jsx     # 待办事项组件
│   │   └── TodoList.jsx     # 待办列表组件
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # React入口
│   └── index.css            # 全局样式（Tailwind）
├── main.js                  # Electron主进程
├── preload.js               # 预加载脚本（安全IPC）
├── vite.config.mjs          # Vite配置
├── tailwind.config.js       # Tailwind配置
├── package.json
├── README.md
└── release/                 # 打包输出目录
    ├── *.dmg                # DMG安装包
    └── mac-*/               # .app文件
```

## 🚀 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

**终端1 - 启动Vite开发服务器：**
```bash
pnpm dev
```

**终端2 - 启动Electron应用：**
```bash
pnpm electron . --dev
```

### 打包应用

```bash
# 打包成 DMG 文件
pnpm dist
```

打包完成后，安装包位于 `release/` 目录：
- `Mac Desktop Todo-1.0.0-arm64.dmg` - Apple Silicon 版本
- `Mac Desktop Todo-1.0.0.dmg` - Intel 版本

## 📖 使用说明

### 基本操作

- **展开/隐藏面板**：点击顶部菜单栏图标
- **添加待办**：在输入框输入内容，点击"添加"或按回车
- **标记完成**：点击待办事项左侧的复选框
- **编辑待办**：鼠标悬停在待办项上，点击编辑图标（✎）
- **删除待办**：鼠标悬停在待办项上，点击删除图标（✕）
- **筛选视图**：点击顶部的筛选按钮（全部/进行中/已完成）

### macOS特性

- **菜单栏图标**：应用只在顶部菜单栏显示图标
- **不在Dock中**：底部工具栏不显示应用图标
- **开机自启动**：开机时自动启动，后台运行
- **点击外部隐藏**：点击面板外的任何地方自动隐藏

### 退出应用

在应用面板中点击任意位置使其获得焦点，然后使用键盘快捷键：
- **Cmd + Q**：退出应用（如已实现）

或使用系统方式：
- 打开"活动监视器"，找到"Mac Desktop Todo"进程，强制退出

## 💾 数据存储

待办事项数据存储在：
- **macOS**: `~/Library/Application Support/mac-desktop-todo/todos.json`

数据会在每次操作后自动保存。

## 🎨 界面预览

- **窗口尺寸**：320 x 480 像素（紧凑型设计）
- **不可调整大小**：固定尺寸，保持界面整洁
- **始终置顶**：面板显示在最前面
- **默认筛选**：默认显示"进行中"的待办事项
- **黑白配色**：简洁的黑白灰色调设计

## 🔧 配置说明

### 窗口配置（main.js）

```javascript
{
  width: 320,
  height: 480,
  frame: false,           // 无边框
  resizable: false,       // 不可调整大小
  alwaysOnTop: true,      // 始终置顶
  show: false,            // 初始隐藏
  skipTaskbar: true       // 不在Dock中显示
}
```

### 开机启动配置

应用会自动设置开机自启动，配置位于`main.js`：

```javascript
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: true,     // 后台启动
  path: process.execPath,
  args: []
});
```

如需禁用，将`openAtLogin`改为`false`。

## 📝 注意事项

### 代码签名

- 打包的应用使用 ad-hoc 签名（开发者身份签名）
- 首次打开时可能需要：
  1. 右键点击应用 → "打开"
  2. 在"系统设置" → "隐私与安全性"中允许运行

### 开发环境

- 开发模式下会自动打开开发者工具
- 开机自启动在开发模式可能不生效，打包后正常

### 生产环境

- 打包后的应用为独立 `.app` 文件
- 双击 `.app` 文件即可运行
- 建议安装到 `/Applications` 目录

## 🚧 未来计划

- [ ] 添加设置界面（切换开机启动、主题等）
- [ ] 支持快捷键（Cmd+Q退出等）
- [ ] 添加拖拽排序功能
- [ ] 支持数据导入/导出
- [ ] 添加提醒功能
- [ ] 支持iCloud同步
- [ ] 添加应用图标自定义
- [ ] 添加深色模式支持

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受你的Todo应用！** 🎉


## 📖 使用说明

### 基本操作

- **展开/隐藏面板**：点击顶部菜单栏图标
- **添加待办**：在输入框输入内容，点击"添加"或按回车
- **标记完成**：点击待办事项左侧的复选框
- **编辑待办**：鼠标悬停在待办项上，点击编辑图标（✎）
- **删除待办**：鼠标悬停在待办项上，点击删除图标（✕）
- **筛选视图**：点击顶部的筛选按钮（全部/进行中/已完成）

### macOS特性

- **菜单栏图标**：应用只在顶部菜单栏显示图标
- **不在Dock中**：底部工具栏不显示应用图标
- **开机自启动**：开机时自动启动，后台运行
- **点击外部隐藏**：点击面板外的任何地方自动隐藏

### 退出应用

由于不在Dock中显示，退出方式：

1. **使用活动监视器**：强制退出进程
2. **使用命令行**：
   ```bash
   pkill -f "electron"
   ```
3. **在开发模式**：直接关闭开发终端

## 💾 数据存储

待办事项数据存储在：
- **macOS**: `~/Library/Application Support/mac-desktop-todo/todos.json`

数据会在每次操作后自动保存。

## 🎨 界面预览

- **窗口尺寸**：320 x 480 像素（紧凑型设计）
- **不可调整大小**：固定尺寸，保持界面整洁
- **始终置顶**：面板显示在最前面
- **默认筛选**：默认显示"进行中"的待办事项
- **黑白配色**：简洁的黑白灰色调设计

## 🔧 配置说明

### 窗口配置（main.js）

```javascript
{
  width: 320,
  height: 480,
  frame: false,           // 无边框
  resizable: false,       // 不可调整大小
  alwaysOnTop: true,      // 始终置顶
  show: false,            // 初始隐藏
  skipTaskbar: true       // 不在Dock中显示
}
```

### 开机启动配置

应用会自动设置开机自启动，配置位于`main.js`：

```javascript
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: true,     // 后台启动
  path: process.execPath,
  args: []
});
```

如需禁用，将`openAtLogin`改为`false`。

## 📝 注意事项

### 开发环境

- 开发模式下会自动打开开发者工具
- 开发模式下托盘图标可能使用默认图标
- 开机自启动在开发模式可能不生效，打包后正常

### 生产环境

- 需要先将应用打包：`pnpm build`
- 建议使用`electron-builder`打包成`.app`文件
- 打包后的应用可以正常使用所有功能

### macOS权限

首次运行可能需要授予以下权限：
- 辅助功能权限（如果使用自动化功能）
- 通知权限（如果启用通知提醒）

## 🚀 未来计划

- [ ] 添加设置界面（切换开机启动、主题等）
- [ ] 支持快捷键（Cmd+Q退出等）
- [ ] 添加拖拽排序功能
- [ ] 支持数据导入/导出
- [ ] 添加提醒功能
- [ ] 支持iCloud同步

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
