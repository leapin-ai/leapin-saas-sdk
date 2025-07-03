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