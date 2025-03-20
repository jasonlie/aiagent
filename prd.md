AI Agent 集成平台 PRD（产品需求文档）- 修订版
1. 产品概述
1.1 产品背景
设计并开发一个 AI Agent 集成平台，为香港市场的初创企业和中小企业提供各种自动化工作流程解决方案。平台按照不同部门需求（Sales、Marketing、Research、Operations、Legal）提供专门的 AI 工具，支持与 Google Drive、Google Sheets、RSS、Telegram 等应用的集成。

1.2 产品目标

提供易用、高效的 AI 工作流自动化解决方案

解决香港本地企业特定的业务挑战

降低 AI 技术应用门槛

实现各种第三方服务的无缝集成

1.3 目标用户

香港地区的初创企业和中小企业

寻求提升工作效率的企业部门负责人

需要自动化数据处理和分析的专业人员

2. 功能规范
2.1 核心功能
2.1.1 用户管理

用户注册和登录（支持邮箱和社交媒体登录）

用户配置文件管理

密码重置功能

用户订阅和付费管理

2.1.2 按部门组织的 AI Agent
每个部门提供特定的 AI 工具，包括但不限于：

Research:


RSS 新闻聚合与 AI 分析总结

行业报告自动生成

研究数据可视化

市场研究助手

Marketing:


社交媒体内容生成与分析

SEO 优化博客写作

市场趋势分析

内容营销效果评估

Sales:


Instagram 内容分析（通过 Apify 获取内容，AI 进行产品分析）

潜在客户数据挖掘

FAQ 自动回复生成器

客户查询处理工具

Operations:


流程自动化工具

数据整理与分析

报表自动生成

日历预约调度器

Integrations:


系统集成构建器

API 连接工具

数据提取与转换助手

2.1.3 工作流执行

手动触发工作流执行

工作流状态监控

执行结果展示与导出

历史记录查询

2.1.4 第三方服务集成

Google OAuth2 认证

其他服务 API 集成（RSS、Apify、Telegram 等）

用户凭证安全管理

2.2 非功能需求
2.2.1 性能需求

页面加载时间 < 2 秒

AI 工作流响应时间视复杂度而定，但系统应提供状态更新

支持并发用户数：初期 100 用户同时在线

2.2.2 安全性需求

所有通信使用 HTTPS

用户凭证加密存储

API 密钥安全管理

数据访问权限控制

2.2.3 可用性需求

系统可用性 > 99.5%

多浏览器兼容性（Chrome、Safari、Edge、Firefox）

响应式设计，支持桌面与平板设备

3. 技术架构
3.1 前端架构

框架：React.js

UI 库：Shadcn UI

状态管理：Zustand

路由：React Router

API 通信：Axios/Fetch

3.2 后端架构

用户认证与数据存储：Supabase

AI 模型调用：OpenRouter API

工作流编排：Composio（集成其 MCP 功能）

任务队列管理：Redis（可选）

3.3 部署架构

前端：静态文件托管

后端：Docker 容器化部署在自有 Linux 服务器

数据库：Supabase 托管服务

3.4 文件夹结构
code

/
├── frontend/
│   ├── src/
│   │   ├── components/       # 共享组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── layouts/         # 布局组件
│   │   ├── contexts/        # 全局上下文
│   │   ├── utils/           # 工具函数
│   │   ├── services/        # API 服务
│   │   ├── features/        # 功能模块
│   │   │   ├── auth/        # 认证相关
│   │   │   ├── common/      # 共通功能
│   │   │   ├── research/    # Research 部门 Agent
│   │   │   ├── marketing/   # Marketing 部门 Agent
│   │   │   ├── sales/       # Sales 部门 Agent
│   │   │   ├── operations/  # Operations 部门 Agent
│   │   │   └── integrations/ # Integrations 部门 Agent
│   │   └── App.jsx
│   └── public/
│
├── backend/
│   ├── auth/                # 认证相关 API
│   ├── billing/             # 计费与订阅
│   ├── agents/
│   │   ├── research/        # Research Agent 后端
│   │   ├── marketing/       # Marketing Agent 后端
│   │   ├── sales/           # Sales Agent 后端
│   │   ├── operations/      # Operations Agent 后端
│   │   └── integrations/    # Integrations Agent 后端
│   ├── integrations/        # 第三方服务集成
│   │   ├── google/
│   │   ├── rss/
│   │   └── telegram/
│   └── utils/               # 后端工具函数
│
├── shared/                  # 前后端共享代码
│
└── docker/                  # Docker 配置文件
4. 用户界面设计
4.1 视觉风格

简约、现代、高效的设计语言

类似 Apple 的极简风格

清晰的视觉层次

主色调采用浅色背景，关键元素使用高对比度点缀

充分留白，减少视觉干扰

4.2 布局结构

左侧边栏：系统导航，包含品牌标志、主要功能分类

主内容区：Agent 列表、详情与工作流执行

左下角：用户资料和使用量统计

顶部：搜索栏和操作按钮

4.3 主要页面
4.3.1 登录/注册页面

极简设计风格的登录表单

清晰的品牌展示

简洁的错误提示

4.3.2 主页/模板页面

顶部搜索栏，方便快速查找 Agent

分类标签式导航，按部门分组

Agent 卡片网格展示，每个卡片包含：
图标/插图
Agent 名称
简短功能描述
作者信息
克隆/使用按钮

4.3.3 部门分类浏览页

按照 Relevance AI 的方式分组展示 Agent：Research、Marketing、Sales、Operations、Integrations

每个分类使用独特但协调的视觉设计

卡片式展示各部门下的 Agent 工具

4.3.4 Agent 执行页面

左侧参数配置区

右侧结果展示区

清晰的执行状态指示器

简约但功能完备的工具栏

4.3.5 用户资料与使用统计

位于左下角，始终可见

显示用户头像和名称

显示已用/剩余使用次数的进度条

简洁的订阅状态指示

5. 数据模型
5.1 用户数据

用户基本信息（ID、名称、电子邮件等）

身份验证数据

订阅状态与付款信息

5.2 Agent 配置数据

Agent 定义与参数

用户特定配置

5.3 执行数据

工作流执行记录

输入参数

执行结果

使用统计

6. 业务规则
6.1 免费使用政策

新注册用户获得 10 次免费体验

一次完整工作流执行计为 1 次使用

失败的工作流不计入使用次数

6.2 订阅计划

月费 20 美元/月

无使用次数限制

所有部门 Agent 完全访问权限

7. 项目实施计划
7.1 阶段一：基础框架

设计并实现用户认证系统

创建基本 UI 框架与导航

实现部门分类结构

建立使用次数计费系统

集成支付功能

7.2 阶段二：Agent 开发

为每个部门开发至少一个核心 Agent

依次实现各个 Agent，确保独立性

完善第三方服务集成

实现结果导出功能

7.3 阶段三：优化与扩展

性能优化

用户体验改进

添加更多 Agent

扩展集成选项
