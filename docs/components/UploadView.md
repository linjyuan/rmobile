---
title: UploadView
nav: 
  title: "组件"
  path: /components
  order: 3
group:
  title: 常用组件
  order: 3
---
# UploadView

## 代码演示

<code src="../../src/components/UploadView/demo/index.tsx" compact=true background="#fff" defaultShowCode=true ></code>


## API
| 参数 | 说明 | 类型 | 默认值 |
| -- | -- |-- |-- |
| visible | 是否展示 | boolean | false |
| onSubmit | 点击事件 | `(file: string, base64: CanvasDataMap) => void;`  | - |
| signName | 手写数据 | string | "" |
| onClose | 取消事件 | () => void | - |

###  CanvasDataMap 类型
| 参数 | 说明 | 类型 | 默认值 |
| -- | -- |-- |-- |
| base64 | base64字符串 | string | - |
| imageData | 图片 | ImageData | - |
| character | 绘制数据 | string | - |
