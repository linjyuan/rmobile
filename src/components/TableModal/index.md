---
title: TableModal
nav:
  title: 组件
  path: /components
  
---

# TableModal

## 代码演示

<code src="./demo/index.tsx" compact=true background="#fff" defaultShowCode=true></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 是否必填|
| :----: | :----: | :----: | :----: | :----: |
| title | 标题 | string | '' | 是 |
| disabled | 是否可编辑 | boolean | false | 否 |
| data | 表单 | IFormItemProps[] | [] | 是 |
| value | 初始值 | Record<string, any>[] | [] | 否 |
| onChange | 选中项改变事件 |  (val:Record<string, any>[]) => void | function | 否 | 
| isNullable | 是否可为空 | boolean | false | 否 |
| customButton | 表单下边按钮 | CustomButtonProps[] | [] | 否 |
| extra | 表单右按钮 |  (formsData: IFormItemProps[], index: number)=> React.ReactNode |   | 否 |
| onCancel | 取消按钮事件 | (value,allValue)=>void | function | 否 |
| onDefine | 确定按钮事件 | (value,allValue)=>void | function | 否 |
| subTitle | 副标题 | string || React.ReactNode | "" | 否 |




