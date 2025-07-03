
# RecruitmentChannel


### 概述

RecruitmentChannel是一个用于管理招聘渠道的React组件。该组件提供了一个统一的界面，用于选择和管理不同的招聘网站渠道，如SEEK等。

### 主要功能

- 渠道选择：提供多个招聘渠道选项供用户选择
- 渠道管理：选择特定渠道后，显示该渠道的管理界面
- 统一界面：为不同的招聘渠道提供一致的用户体验
- 可扩展性：支持添加新的招聘渠道

### 使用场景

- 招聘职位发布管理
- 多渠道招聘策略实施
- 招聘广告管理
- 招聘渠道效果分析

### 技术特点

1. 组件化设计
   - 主组件：RecruitmentChannel
   - 子组件：各招聘渠道组件（如Seek）

2. 灵活的配置
   - 支持自定义渠道列表
   - 每个渠道可配置自己的logo和标签
   - 统一的属性传递机制

3. 交互友好
   - 清晰的渠道选择界面
   - 简洁的导航结构
   - 一致的用户体验


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _RecruitmentChannel(@components/RecruitmentChannel)

```jsx
const { default: RecruitmentChannel } = _RecruitmentChannel;
const BaseExample = () => {
  return <RecruitmentChannel />;
};

render(<BaseExample />);

```


### API

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| className | string | - | 自定义CSS类名 |
| style | object | - | 自定义内联样式 |
| channels | array | [] | 招聘渠道列表，每个渠道对象包含name、logo、label等属性 |
| onChannelSelect | function | - | 选择渠道时的回调函数，参数为选中的渠道对象 |
| selectedChannel | string | - | 当前选中的渠道名称 |
| children | node | - | 渠道管理界面的内容 |

#### Channel 对象属性

| 属性名 | 类型 | 必填 | 说明 |
| ------ | ---- | ---- | ---- |
| name | string | 是 | 渠道唯一标识 |
| logo | string | 是 | 渠道logo图片URL |
| label | string | 是 | 渠道显示名称 |
| disabled | boolean | 否 | 是否禁用该渠道 |
| tooltip | string | 否 | 渠道提示信息 |

### 样式类

| 类名 | 说明 |
| ---- | ---- |
| container | 组件容器样式 |
| channel-item | 渠道项样式 |
| title | 标题样式 |

### 示例

```jsx
import RecruitmentChannel from '@leapin/saas-sdk/components/RecruitmentChannel';

const channels = [
  {
    name: 'seek',
    logo: 'seek-logo.png',
    label: 'SEEK',
  },
  {
    name: 'indeed',
    logo: 'indeed-logo.png',
    label: 'Indeed',
    disabled: true,
    tooltip: '即将上线',
  }
];

const App = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <RecruitmentChannel
      channels={channels}
      selectedChannel={selectedChannel}
      onChannelSelect={(channel) => setSelectedChannel(channel.name)}
    >
      {selectedChannel === 'seek' && <SeekManagement />}
    </RecruitmentChannel>
  );
};
```

### 注意事项

1. channels属性是必需的，且至少需要包含一个渠道对象
2. 每个渠道对象的name属性必须唯一
3. 渠道logo建议使用合适尺寸的图片，以确保良好的显示效果
4. 禁用的渠道会显示禁用状态，并且不可点击
5. 可以通过className和style属性自定义组件的外观

