---
title: TableModal
nav: 
  title: "组件"
  path: /components
  order: 3
group:
  title: 常用组件
  order: 3
---
# TableModal

## 代码演示

<code src="../../src/components/TableModal/demo/index.tsx" compact=true background="#fff" defaultShowCode=true ></code>


## API
| 参数 | 说明 | 类型 | 默认值 |
| -- | -- |-- |-- |
| title | 标题 | string | '' |
| disabled | 是否禁用 | boolean | false |
| data | 表单数据 | `IFormItemProps[]` | [] |
| isDelect | 是否删除 | boolean | false |
| onDelete | 删除函数 | `(data: IFormItemProps[], index: number) => void` | - |
| customButton | 按钮 | ButtonProps[] | [] |
| onCancel | 取消事件 | `(value: Record<string, any>,allValue: Record<string, any>[],) => void` | - |
| onDefine | 确定事件 | `(value: Record<string, any>,allValue: Record<string, any>[],) => void;` | - |
| subTitle | 副标题 | `string | React.ReactNode`  | - |
| extra | 右边注释 | string | - |







