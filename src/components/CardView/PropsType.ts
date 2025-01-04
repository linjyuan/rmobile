export interface CardViewListItemProps {
  /**
   * @param leftIcon 左侧图标
   */
  leftIcon?: string;

  /**
   * @param urgeCount 催办
   */
  urgeCount?: string;

  /**
   * @param title 标题
   */
  title: string;

  /**
   * @param label 标签
   */
  label?: string;

  /**
   * @param stylesName 根据 stylesName 设置已有样式
   */
  stylesName?: string;

  /**
   * @param font 基础字体样式 normal bold disabled
   */
  font?: 'normal' | 'bold' | 'disabled';

  /**
   * @param style cover 样式
   */
  style?: React.CSSProperties | undefined;

  /**
   * @param urgeBtn 催办按钮
   */
  urgeBtn?: React.ReactNode | string;

  /**
   * @param drawedBtn 撤回按钮
   */
  drawedBtn?: React.ReactNode | string;

  /**
   * @param hidden 是否隐藏
   */
  hidden?: boolean;

  /**
   * @param footer 子项（row）的底部按钮
   */
  footer?: React.ReactNode;
}

export interface CardViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * id
   */
  id?: string;

  /**
   * @param label 标题
   */
  label?: string | React.ReactNode;

  /**
   * @param rightExtra 标题栏右侧 extra
   */
  rightExtra?: React.ReactNode | string;

  /**
   * @param urgeBtn 催办按钮
   */
  urgeBtn?: React.ReactNode | string;

  /**
   * @param list 配置列表，一维数组或二维数组
   */
  list?:
    | Partial<CardViewListItemProps[]>
    | CardViewListItemProps[][]
    | undefined; // 一维数组或二维数组
  /**
   * @param listCoverStyle listItem 覆盖样式
   */
  listCoverStyle?: React.CSSProperties;

  /**
   * @param flexRow 行元素是否 flex，不选则是默认 flex column
   */
  flexRow?: boolean;

  /**
   * @param stylesName 根据 stylesName 设置已有样式
   */
  // eslint-disable-next-line react/no-unused-prop-types
  stylesName?: string;

  /**
   * @param onClick 点击事件
   */
  onClick?: (e: any) => void;

  /**
   * @param children 自定义 children
   */
  children?: React.ReactNode | string;

  /**
   * @param footer 底部按钮
   */
  footer?: React.ReactNode;

  /**
   * @param justifyFooter 底部按钮排列方式 start | end | center | space-around | space-between
   */
  justifyFooter?: string;

  /**
   * 底部按钮自定义样式
   */
  footerStyles?: React.CSSProperties;

  /**
   * @param hidden 是否隐藏，默认否 false
   */
  hidden?: boolean;

  /**
   * @param swipeDisabled 滑动模式下，滑动是否禁用，默认否 false
   */
  swipeDisabled?: boolean;

  /**
   * @param swipeActions 滑动菜单配置
   */
  swipeActions?:
    | {
        key: string | number;
        text: string;
        onClick?: (() => void) | undefined;
        color?:
          | 'light'
          | 'weak'
          | 'primary'
          | 'success'
          | 'warning'
          | 'danger'
          | string;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
      }[]
    | undefined;

  /**
   * @param collapse 是否折叠，默认 false
   */
  collapse?: boolean;

  /**
   * 折叠的时候使用，当回调
   */
  collapseBackFun?: Function;
}
