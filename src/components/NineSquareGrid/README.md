
# NineSquareGrid


### 概述

NineSquareGrid是一个用于展示和编辑九宫格评估矩阵的React组件。该组件主要用于人才评估场景，通过绩效和潜力两个维度对人才进行分类和定位。

### 主要功能

- 展示模式：以九宫格矩阵的形式展示人才分布
- 编辑模式：支持编辑每个格子的标题、描述和建议
- 国际化支持：内置中英文语言包
- 位置计算：提供getLocation工具函数，用于根据评分计算九宫格位置

### 使用场景

- 人才评估矩阵展示
- 人才发展规划
- 绩效潜力分析
- 人才梯队建设

### 技术特点

1. 组件化设计
   - NineSquareGrid：展示组件
   - NineSquareGridEditor：编辑组件
   - getLocation：位置计算工具

2. 灵活的配置
   - 支持自定义样式
   - 可配置标题和描述
   - 支持国际化配置

3. 交互友好
   - 清晰的视觉展示
   - 直观的编辑界面
   - 响应式设计


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _NineSquareGrid(@components/NineSquareGrid)

```jsx
const { default: NineSquareGrid } = _NineSquareGrid;
const BaseExample = () => {
  return <NineSquareGrid />;
};

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _NineSquareGrid(@components/NineSquareGrid)

```jsx
const { NineSquareGridEditor } = _NineSquareGrid;
const BaseExample = () => {
  return <NineSquareGridEditor.Field />;
};

render(<BaseExample />);

```


### API

### NineSquareGrid 组件

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| className | string | - | 自定义CSS类名 |
| style | object | - | 自定义内联样式 |
| data | object | - | 九宫格数据，包含每个格子的标题、描述和建议 |
| locale | string | 'zh-CN' | 国际化语言，支持'zh-CN'和'en-US' |
| onClickGrid | function | - | 点击格子时的回调函数，参数为格子索引 |
| showTitle | boolean | true | 是否显示格子标题 |
| showDesc | boolean | true | 是否显示格子描述 |
| showSuggestion | boolean | true | 是否显示格子建议 |
| showLocation | boolean | true | 是否显示位置标记 |
| location | object | - | 位置信息，包含x和y坐标 |
| locationText | string | - | 位置标记文本 |

### NineSquareGridEditor 组件

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| className | string | - | 自定义CSS类名 |
| style | object | - | 自定义内联样式 |
| data | object | - | 九宫格数据，包含每个格子的标题、描述和建议 |
| locale | string | 'zh-CN' | 国际化语言，支持'zh-CN'和'en-US' |
| onChange | function | - | 数据变更时的回调函数，参数为更新后的数据 |
| showTitle | boolean | true | 是否显示格子标题编辑 |
| showDesc | boolean | true | 是否显示格子描述编辑 |
| showSuggestion | boolean | true | 是否显示格子建议编辑 |
