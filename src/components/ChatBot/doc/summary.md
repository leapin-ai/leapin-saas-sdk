ChatBot 是悬浮式 AI 对话组件：右下角悬浮球通过 `useModal` 打开对话框，内嵌 `@kne/react-bot`，对接 rag-chatbot 会话；completions 通过 `@kne/axios-fetch` 的 `fetchSse: true`（FetchEventSource）做 POST SSE 流式问答。`openSide` 时桌面左右分栏；移动端复用同一 SidePanel 嵌在对话区展示媒体/组件（不展示未解析 yml）。

### 主要功能

- 可拖动悬浮球（位置缓存 localStorage，越界则复位）
- 悬浮球唤起对话弹窗
- 创建会话并流式 completions
- 侧栏展示引用 / 媒体（`openSide`）
- 凭证与 chatbot id 由 SDK `options` 传入

### 使用场景

- SaaS 页面右下角智能助手
- 知识库 / RAG 问答入口
