
# InventoryReport


### 概述

InventoryReport 是一个人才库报表组件，提供以下功能：
- 显示人才库的详细报表
- 支持报表的下载和分享
- 包含多种图表展示（如柱状图、环形图、九宫格等）
- 支持国际化

### 主要子组件
1. **InventoryReport** - 报表
2. **InventoryReportButton** - 触发报表显示的按钮

### 使用场景
- 人才管理系统中的人才库分析
- 招聘数据可视化展示
- 人才保留率分析


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _InventoryReport(@components/InventoryReport),_mockPreset(@root/mockPreset),remoteLoader(@kne/remote-loader)

```jsx
const { default: InventoryReport } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <InventoryReport />
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _InventoryReport(@components/InventoryReport),_mockPreset(@root/mockPreset),remoteLoader(@kne/remote-loader)

```jsx
const { InventoryReportButton, DownloadReportButton } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <InventoryReportButton>点击显示报表</InventoryReportButton>
      <DownloadReportButton ids={[1, 2, 3]}>点击下载批量报表</DownloadReportButton>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _InventoryReport(@components/InventoryReport),_mockPreset(@root/mockPreset),remoteLoader(@kne/remote-loader)

```jsx
const { ShareInventoryReport } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <ShareInventoryReport className="is-print" />
    </PureGlobal>
  );
});

render(<BaseExample />);

```


### API

### InventoryReport 组件

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 控制报表是否可见 | boolean | false |
| onClose | 关闭报表的回调函数 | function | - |
| onDownload | 下载报表的回调函数 | function | - |
| onShare | 分享报表的回调函数 | function | - |
| className | 自定义类名 | string | - |
| style | 自定义样式 | object | - |
| title | 报表标题 | string | '人才库报表' |
| data | 报表数据 | object | - |
| loading | 加载状态 | boolean | false |
| locale | 国际化配置 | object | - |

### InventoryReportButton 组件

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮内容 | ReactNode | - |
| onClick | 点击按钮的回调函数 | function | - |
| className | 自定义类名 | string | - |
| style | 自定义样式 | object | - |
| disabled | 是否禁用 | boolean | false |

