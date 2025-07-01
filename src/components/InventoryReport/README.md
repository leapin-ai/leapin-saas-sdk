
# InventoryReport


### 概述

人才盘点报告


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
const { InventoryReportButton } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <InventoryReportButton>点击显示报表</InventoryReportButton>
    </PureGlobal>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

