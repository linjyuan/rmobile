import { ReactNode } from 'react';

export interface SwipeCellProps {
  disabled?: boolean;
  stopPropagation?: boolean;
  // 左侧滑动区域的内容
  leftAction?: ReactNode;
  // 右侧滑动区域的内容
  rightAction?: ReactNode;
  // 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise
  beforeClose?: boolean;
}
