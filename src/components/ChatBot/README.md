# ChatBot

### 概述

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


### 示例(全屏)

#### 示例代码

- 悬浮球对话
- 右下角悬浮球打开 ReactBot 弹窗，对接 rag-chatbot（baseUrl / chatId / token 由 options 传入）
- _ChatBot(@components/ChatBot)

```jsx
const { default: ChatBot } = _ChatBot;

const BaseExample = () => {
  return (
    <div
      className="chatbot-example-stage"
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 560,
        height: 'var(--kne-viewport-height, 560px)'
      }}
    >
      <ChatBot
        baseUrl="https://rag-chatbot.staging.leapin-ai.com"
        chatId="a878ad04-04d3-4411-9074-67c389aea590"
        token="sk-bot_KxkVHmXCBFiBpr9qRQ-tfh3vZ6yg6_QWgFAXYeIjc94"
        tips
        title="Elsa"
        openSide
      />
    </div>
  );
};

render(<BaseExample />);

```

### API

### ChatBot

悬浮球 + `components-core:Modal@useModal` 打开对话窗，内部使用 `@kne/react-bot`。

#### SDK 挂载

```js
leapinSaasSdk(el, {
  type: 'ChatBot',
  baseUrl: 'https://rag-chatbot.leapin-ai.com',
  chatId: '<chat_id>',
  token: '<token>'
});
```

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| baseUrl | string | - | **必填**，rag-chatbot 完整域名，如 `https://rag-chatbot.leapin-ai.com` |
| chatId | string | - | **必填**，chatbot id |
| token | string | - | **必填**，Bearer token |
| userId | string | 自动生成 | 创建会话时的 user_id |
| title | string | `'Elsa'` | 对话标题 |
| tips | boolean | - | 是否显示引导气泡 |
| tipsContent | ReactNode | `'Chat here!'` | 引导文案 |
| onVisibleChange | function | - | 弹窗显隐回调 `(open) => void` |
| openSide | boolean | `true` | 是否开启侧栏内容抽取；桌面左右分栏，移动端由 ReactBot 嵌在对话区展示 |
| sideSizes | array | - | 受控分栏尺寸 |
| defaultSideSizes | array | - | 默认分栏尺寸 |
| markdownComponents | object | 内置 ReferenceList | 透传 ReactBot |
| messageInputProps | object | - | 透传输入框配置 |
| messageListProps | object | - | 透传消息列表配置 |

> 缺 `baseUrl` / `chatId` / `token` 时面板展示错误提示，不会发起请求。
>
> 流式问答依赖 `@kne/axios-fetch@^1.2.4`：`getRequest` 返回 `fetchSse: true` + `method: 'POST'` + `data`，鉴权头由面板内 `createAjax` 的 `getDefaultHeaders` 注入。

#### CSS 变量

| 变量 | 默认值 | 说明 |
| ---- | ------ | ---- |
| `--leapin-saas-sdk-chatbot-width` | `1000px` | 弹窗宽度 |
| `--leapin-saas-sdk-chatbot-height` | `720px` | 弹窗高度 |
| `--leapin-saas-sdk-chatbot-stage-min-height` | `560px` | 浮球舞台最小高度（PC 示例容器需有高度才能看见浮球） |
| `--leapin-saas-sdk-chatbot-bottom` | `120px` | 悬浮球默认距底（无缓存或复位时） |
| `--leapin-saas-sdk-chatbot-right` | `40px` | 悬浮球默认距右（无缓存或复位时） |

> 浮球位置与拖动：`useDraggableFloatPos` + `ChatBotFloat`；未真正移动松手视为点击打开弹窗。
>
> 内容区 `.panel` / `.react-bot` 高度使用 Modal 的 `--modal-height` / `--min-modal-height`。
