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
| `--leapin-saas-sdk-chatbot-bottom` | `120px` | 悬浮球默认距底（无缓存或复位时） |
| `--leapin-saas-sdk-chatbot-right` | `40px` | 悬浮球默认距右（无缓存或复位时） |

> 浮球位置与拖动：`useDraggableFloatPos` + `ChatBotFloat`；未真正移动松手视为点击打开弹窗。
>
> 内容区 `.panel` / `.react-bot` 高度使用 Modal 的 `--modal-height` / `--min-modal-height`。
