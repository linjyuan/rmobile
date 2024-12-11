export interface FooterBtnItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @params title 按钮显示名
   */
  title: string;

  /**
   * @params key
   */
  key: string;

  /**
   * @params type 按钮类型， 默认 default
   */
  type?:
    | 'default'
    | 'other'
    | 'normal'
    | 'warning'
    | 'negative'
    | 'positive'
    | 'danger';

  /**
   * @params onPress 点击事件
   */
  onPress?: () => void;

  /**
   * @params hidden 是否隐藏，默认 false
   */
  hidden?: boolean;
}

export interface FooterViewsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @params list 按钮配置列表
   */
  list: FooterBtnItemProps[];

  /**
   * @params fixed 样式是否 fixed，默认 true
   */
  // fixed?: boolean;

  /**
   * @params style 样式对象
   */
  style?: React.CSSProperties;
}
