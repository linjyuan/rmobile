import type { IFormItemProps } from '@alitajs/dform';
import { ButtonProps } from '../Button/PropsType';
export interface ModalInputCardProps {
  title: string;
  key?: string;
  data: IFormItemProps[];
  disabled?: boolean;
  // 是否展示可删除图标 true-可删除
  isDelect?: boolean;
  onDelete?: (data: IFormItemProps[], index: number) => void;
  value?: Record<string, any>[];
  onChange: (value: Record<string, any>[]) => void;
  isNullable?: boolean;
  // customButton?: FooterViewsProps['list'];
  customButton?: ButtonProps[];
  // 取消方法
  onCancel?: (
    value: Record<string, any>,
    allValue: Record<string, any>[],
  ) => void;
  // 确定方法
  onDefine?: (
    value: Record<string, any>,
    allValue: Record<string, any>[],
  ) => void;
  subTitle?: string | React.ReactNode;
  extra?: (formsData: IFormItemProps[], index: number) => React.ReactNode;
}
export interface TableModalRef {
  validate: () => Promise<unknown>;
  getValue: () => FormsValuesArrItemData[];
  add: () => void;
  remove: (removeIndex: number) => void;
  relativeFieldset: (fieldset: Array<ModalInputCardProps>) => void;
}

// export interface CustomButtonProps {
//   onClick: () => void;
//   text: string;
//   size?: 'md' | 'lg' | 'sm';
//   type?: 'default' | 'primary';
//   disabled?: boolean;
// }

export interface FormsValuesArrItemData {
  // id: number;
  [key: string]: number | string | boolean;
}
