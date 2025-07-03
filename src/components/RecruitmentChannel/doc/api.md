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
