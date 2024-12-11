import { isArrayElementEqual } from '@/utils';
import classnames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import type { FooterBtnItemProps, FooterViewsProps } from './PropsType';
import './index.less';

const classPrefix = 'rmobile-footerBtn';

const FooterViews: FC<FooterViewsProps> = (props) => {
  const {
    list = [],
    // fixed = true,
    style = undefined,
  } = props;

  const BtnItem = (
    item: FooterBtnItemProps = {
      title: '',
      key: '',
      hidden: false,
      onPress: () => {},
      type: 'default',
      style: {},
    },
  ) => (
    <div
      className={classnames({
        [`${classPrefix}-btnItem`]: true,
        btnItem: true,
        other: item.type === 'other',
        normal: item.type === 'normal',
        negative: item.type === 'negative',
        positive: item.type === 'positive',
        warning: item.type === 'warning',
        danger: item.type === 'danger',
        // [styles.hide]: item.hidden === true,
      })}
      style={item.style}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        item.onPress?.();
      }}
    >
      {item.title}
    </div>
  );

  const btnHideOptionList = list
    .map((item) => (item.hidden ? '1' : '0'))
    .filter((i) => i);
  const isAllHidden = isArrayElementEqual(btnHideOptionList, '1');

  // list 长度为空 或 list 只有 1 个元素且 hidden 为 true，则不显示
  return !list.length ||
    (list.length === 1 && list[0].hidden) ||
    isAllHidden ? (
    <></>
  ) : (
    <div
      style={style || {}}
      className={classnames([
        'footerView',
        'footerViews',
        // fixed ? 'fixed' : '',
      ])}
    >
      {list.map((item) => {
        if (item.hidden) return <></>;
        return <BtnItem {...item} key={item.key} />;
      })}
    </div>
  );
};

export default FooterViews;
