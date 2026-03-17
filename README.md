# 天机 (TianJi) - 玄学文化数字平台

<p align="center">
  <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☯</text></svg>" alt="天机 Logo" width="120">
</p>

<p align="center">
  <a href="https://badhope.github.io/TianJi/">
    <img src="https://img.shields.io/badge/访问网站-c9a227?style=for-the-badge&logo=github" alt="Website">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-c9a227?style=for-the-badge" alt="License">
  </a>
  <img src="https://img.shields.io/badge/版本-3.0.0-c9a227?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/HTML5-5-orange?style=for-the-badge&logo=html5" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-3-blue?style=for-the-badge&logo=css3" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript" alt="JavaScript">
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/badhope/TianJi/main?style=for-the-badge&color=c9a227" alt="Last Commit">
  <img src="https://img.shields.io/github/issues/badhope/TianJi?style=for-the-badge&color=c9a227" alt="Issues">
  <img src="https://img.shields.io/github/stars/badhope/TianJi?style=for-the-badge&color=c9a227" alt="Stars">
  <img src="https://img.shields.io/github/forks/badhope/TianJi?style=for-the-badge&color=c9a227" alt="Forks">
</p>

---

## 📖 项目简介

**天机** 是一个综合性玄学文化数字平台，采用现代 Web 技术呈现中国传统玄学文化精髓。平台遵循"只增不减"原则，在完整保留原始内容数据的前提下，实现内容呈现更丰富、视觉表现更生动、用户交互更友好、信息获取更高效的整体产品体验提升。

### 核心目标

- 传承中华传统文化，弘扬玄学智慧
- 提供现代化交互体验，降低传统文化的学习门槛
- 构建可扩展的模块化架构，支持持续优化迭代

---

## 🛠️ 技术架构

### 前端技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| HTML5 | 语义化 markup | - |
| CSS3 | 响应式布局、动画效果 | - |
| JavaScript | 原生 JS，无框架依赖 | ES6+ |
| Three.js | 3D 粒子效果 | r128 |
| Canvas Confetti | 彩带特效 | 1.6.0 |
| Google Fonts | 字体支持 | - |

### 设计系统

- **色彩体系**：以金色 #c9a227 为主色调，配合深色背景营造神秘氛围
- **字体系统**：ZCOOL XiaoWei、Noto Serif SC、Ma Shan Zheng
- **响应式断点**：
  - 移动端：320px - 480px
  - 平板：481px - 1024px
  - 桌面：1025px+

### 核心特性

- ✅ 响应式设计，完美适配移动端、平板、桌面设备
- ✅ 丰富交互动画，提升用户体验
- ✅ 组件化开发，便于维护和扩展
- ✅ 性能优化，包括懒加载、资源压缩
- ✅ 本地数据存储，支持历史记录和收藏功能

---

## 📁 项目结构

```
TianJi/
├── index.html                   # 入口页面（太极八卦动画）
├── pages/
│   ├── main.html               # 主界面（四大板块导航）
│   ├── fortune.html            # 每日运势
│   ├── calendar.html           # 黄历查询
│   ├── bazi.html              # 八字命理
│   ├── bazi-detail.html       # 八字详细分析
│   ├── yijing.html            # 易经解读
│   ├── yijing-detail.html     # 易经卦象详解
│   ├── divination.html        # 占卜预测
│   ├── fengshui.html          # 风水堪舆
│   ├── shanhai.html           # 山海经
│   ├── meridians.html          # 奇经八脉
│   ├── wellness.html          # 养生导引
│   ├── face.html               # 面相手相
│   ├── naming.html            # 姓名学
│   ├── matchmaking.html        # 八字合婚
│   ├── beasts.html             # 神兽异兽
│   ├── myths.html              # 神话传说
│   ├── folklore.html           # 民俗文化
│   ├── longmai.html            # 地理龙脉
│   ├── taoism.html            # 道教文化
│   ├── alchemy.html            # 丹道筑基
│   ├── neigong.html           # 内功修炼
│   ├── qigong.html            # 气功养生
│   ├── neijing.html           # 黄帝内经
│   ├── metaphysics.html        # 玄学知识
│   ├── classics.html          # 典籍总览
│   ├── classics/
│   │   ├── index.html         # 典籍首页
│   │   └── zhouyi.html        # 周易典籍
│   └── ...
├── css/
│   ├── base.css               # 基础样式与设计变量
│   ├── components.css         # UI 组件库
│   ├── layout.css             # 布局系统
│   ├── animations.css         # 动画定义
│   ├── interactions.css       # 交互动效
│   ├── entrance.css           # 入口页面样式
│   ├── main.css               # 主界面样式
│   ├── page.css               # 通用页面样式
│   ├── fortune.css            # 运势页面样式
│   ├── calendar.css           # 黄历样式
│   ├── bazi.css              # 八字样式
│   ├── yijing.css            # 易经样式
│   ├── shanhai.css           # 山海经样式
│   ├── meridians.css          # 奇经八脉样式
│   ├── wellness.css           # 养生样式
│   ├── compass.css            # 罗盘组件样式
│   └── calendar-widget.css    # 日历组件样式
├── js/
│   ├── utils/
│   │   ├── components.js      # UI 组件库
│   │   ├── datetime.js        # 时间工具模块
│   │   └── common.js          # 通用工具函数
│   ├── effects/
│   │   └── particles.js       # 粒子特效
│   ├── entrance.js            # 入口页面脚本
│   ├── main.js               # 主界面脚本
│   ├── fortune.js            # 运势脚本
│   ├── calendar.js           # 黄历脚本
│   ├── bazi.js               # 八字脚本
│   ├── yijing.js             # 易经脚本
│   └── ...
└── README.md
```

---

## 🎯 功能模块

### 四大内容板块

| 板块 | 主题颜色 | 主要功能 |
|------|----------|----------|
| 天 | 蓝色系 | 运势预测、黄历查询、八字命理、易经解读、占卜预测 |
| 地 | 绿色系 | 风水堪舆、山海经、神兽异兽、神话传说、民俗文化 |
| 玄 | 紫色系 | 奇经八脉、内功修炼、道法符咒、丹道筑基、周易精解 |
| 黄 | 黄色系 | 八字命理、黄帝内经、养生导引、气功养生、姓名学 |

### 核心功能特性

1. **运势查询**：每日运势、每周运势、每月运势、年度运势
2. **黄历查询**：宜忌吉凶、彭祖百忌、神煞方位、时辰吉凶
3. **八字命理**：命主分析、大运流年、五行分析、合婚配对
4. **易经占卜**：六爻预测、卦象解读、爻辞详解
5. **风水堪舆**：罗盘定向、八卦定位、居家风水
6. **日历组件**：日期选择、事件管理、农历显示

---

## 📦 安装与使用

### 环境要求

- 现代浏览器（Chrome 80+, Firefox 75+, Safari 13+, Edge 80+）
- 无需后端服务器，纯静态页面可直接运行

### 本地运行

```bash
# 克隆项目
git clone https://github.com/badhope/TianJi.git

# 进入目录
cd TianJi

# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 PHP
php -S localhost:8000

# 访问 http://localhost:8000
```

### 直接打开

直接用浏览器打开 `index.html` 即可体验（部分功能如粒子效果需要本地服务器支持）

---

## 🔧 技术实现细节

### 架构设计

项目采用**模块化、组件化**设计思想：

- **页面层**：28+ 个独立 HTML 页面，按功能模块划分
- **样式层**：20+ 个 CSS 文件，包含设计系统、组件库、页面样式
- **逻辑层**：30+ 个 JavaScript 模块，处理业务逻辑和交互

### 核心模块

```javascript
// 组件系统
├── js/utils/components.js    // UI组件库（加载提示、弹窗、回到顶部）
├── js/utils/datetime.js     // 时间工具（日期格式化、农历计算）
└── js/utils/common.js        // 通用工具函数

// 特效系统
└── js/effects/particles.js  // 粒子背景特效（Three.js）

// 业务模块
├── js/fortune.js            // 运势模块
├── js/bazi.js               // 八字命理
├── js/yijing.js             // 易经占卜
└── ...
```

### 设计系统

```css
/* 色彩体系 */
:root {
    --primary-gold: #c9a227;
    --primary-gold-light: #d4af37;
    --primary-gold-dark: #8b6914;
    --bg-dark: #0a0a0a;
    --bg-card: #121212;
    --text-primary: #f5f5f5;
    --text-secondary: #e0e0e0;
}
```

---

## 👥 用户群体分析

### 主要用户画像

| 用户类型 | 需求特点 | 使用场景 |
|----------|----------|----------|
| 文化爱好者 | 了解传统文化 | 学习玄学知识、阅读典籍 |
| 从业人员 | 职业辅助工具 | 命理师、风水师参考 |
| 休闲用户 | 娱乐消遣 | 每日运势、占卜娱乐 |
| 学生群体 | 学术研究 | 论文资料、民俗调研 |

### 商业应用场景

1. **教育培训**：传统文化课程辅助教材
2. **咨询服务业**：命理、风水咨询服务工具
3. **内容媒体**：玄学文化内容输出平台

---

## 🔮 未来扩展方向（规划中）

### 功能扩展

- [ ] 用户系统：登录注册、收藏同步、云端数据
- [ ] 社区功能：用户分享、评论互动
- [ ] 高级付费内容：深度分析报告
- [ ] API 接口：开放数据接口供第三方调用
- [ ] 多语言支持：英文、日文等国际版本

### 技术升级

- [ ] PWA 支持：离线访问、主屏幕安装
- [ ] SSR 渲染：SEO 优化
- [ ] TypeScript 重构：类型安全
- [ ] 单元测试：代码可靠性

### 小程序开发

微信小程序/支付宝小程序版本规划中：
- 基础功能移植
- 扫码识别
- 分享朋友圈

### 后端集成

- [ ] Node.js API 服务
- [ ] 用户数据存储
- [ ] 支付功能

---

## 🤝 贡献指南

### 欢迎贡献

我们欢迎任何形式的贡献：
- 🐛 Bug 修复
- ✨ 新功能开发
- 📖 文档改进
- 🎨 UI/UX 优化

### 提交流程

1. **Fork** 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 **Pull Request**

---

## 🚀 部署指南

### 方法一：GitHub Pages 自动部署

1. **Fork 本仓库** 或将代码推送到你的 GitHub 仓库

2. **设置 GitHub Pages**：
   - 进入仓库 Settings → Pages
   - Source 选择 `main` branch
   - 点击 Save

3. **访问网站**：
   - 等待几分钟后访问 `https://yourusername.github.io/TianJi/`

### 方法二：本地预览

```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 PHP
php -S localhost:8000

# 访问 http://localhost:8000
```

### 方法三：使用 Node.js http-server

```bash
# 安装 http-server
npm install -g http-server

# 启动服务
http-server -p 8000
```

---

## 🔧 开发指南

### 添加新页面

1. 在 `pages/` 目录创建 HTML 文件
2. 引入必要的 CSS 和 JS 文件
3. 使用统一的页面结构模板
4. 添加对应的样式和脚本文件

### 添加新组件

1. 在 `css/components.css` 添加样式
2. 在 `js/utils/components.js` 添加交互逻辑
3. 在页面中引入并初始化组件

### 性能优化建议

- 图片使用懒加载（`loading="lazy"`）
- CSS 动画使用 `transform` 和 `opacity`
- JavaScript 事件使用事件委托
- 定期清理未使用的代码

---

## 📋 版本历史

### v3.0.0 (2026-03)

- 新增组件化开发体系
- 新增基础样式库 (base.css)
- 新增 UI 组件库 (components.css)
- 新增时间工具模块 (datetime.js)
- 新增罗盘组件 (compass.css)
- 新增日历组件 (calendar-widget.css)
- 优化响应式布局，增加移动端适配
- 统一设计系统，增强视觉一致性

### v2.0.0 (2025-06)

- 完善四大板块内容
- 增加动画和交互动效
- 优化页面加载性能

### v1.0.0 (2024-01)

- 初始版本
- 基础功能实现

---

## ⚠️ 免责声明

本品所有内容仅供**文化探索与娱乐参考**，请勿过分迷信。

- 运势、命理等内容仅为娱乐性质
- 占卜结果仅供参考，人生决定需理性思考
- 养生知识仅供参考，具体健康问题请咨询专业医师

---

## 📄 开源许可

本项目基于 **MIT License** 开源。

---

<p align="center">
  <strong>探索玄妙 · 洞察天机</strong><br>
  © 2026 天机 · TianJi
</p>
