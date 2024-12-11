import { useToggle } from '@/hooks';
import { isNil, withStopPropagation } from '@/utils';
import { SwipeAction } from 'antd-mobile';
import classnames from 'classnames';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { CardViewListItemProps, CardViewProps } from './PropsType';
import './index.less';

function max(arr: any[]) {
  return arr.reduce((accu: number, curr: number) => {
    if (curr > accu) return curr;
    return accu;
  });
}
/**
 * 获取数组维度
 * @param arr 所需判断的数组
 */
function getDepth(arr: any[]) {
  const eleDepths = [] as any[];
  arr.forEach((ele) => {
    let depth = 0;
    if (Array.isArray(ele)) {
      depth = getDepth(ele);
    }
    eleDepths.push(depth);
  });
  return 1 + max(eleDepths);
}

const CardView: FC<CardViewProps> = ({
  id = 'card-view',
  label,
  flexRow,
  children,
  rightExtra,
  urgeBtn,
  list = [],
  listCoverStyle = {},
  onClick,
  style,
  hidden = false,
  footer = <></>,
  justifyFooter = 'flex-end',
  footerStyles = {},
  swipeDisabled = false,
  swipeActions = undefined,
  collapse,
  collapseBackFun,
}) => {
  const [visiable, toggleVisiable] = useToggle(collapse ?? false);

  const toggle = useCallback(() => {
    if (isNil(collapse)) return;
    if (collapseBackFun) collapseBackFun(toggleVisiable);
    else toggleVisiable();
  }, []);
  const bodyDisplay = visiable ? 'none' : 'block';

  const renderRow = (list: CardViewListItemProps[]) =>
    list.map(
      (
        item: CardViewListItemProps = {
          title: '',
          leftIcon: '',
          label: '',
          stylesName: '',
          font: 'normal',
          style: {},
          urgeBtn: null,
          drawedBtn: null,
          footer: <></>,
          hidden: false,
        },
        index: number,
      ) => {
        if (!item?.title) return null;
        if (!item.font) item.font = 'normal';
        if (item.hidden === undefined) item.hidden = false;
        if (item.hidden) return null;

        const element = withStopPropagation(
          <div
            key={index}
            className={classnames([
              'listItem',
              // eslint-disable-next-line no-nested-ternary
              item.font === 'normal'
                ? {}
                : item.font === 'bold'
                ? 'listItemBold'
                : 'listItemDisabled',
              item.stylesName ? [item.stylesName] : '',
            ])}
            style={{ ...item.style, ...listCoverStyle }}
            onClick={onClick}
          >
            {item.leftIcon ? <img src={item.leftIcon} alt="" /> : []}
            {item.label ? <div>{item.label}</div> : []}
            <div
              style={{
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                ...(style || {}),
              }}
            >
              {item.title}
              {item.urgeBtn}
              {item.drawedBtn}
            </div>
          </div>,
          ['click'],
        );

        return (
          <div key={index}>
            {/* <> */}
            {element}
            {item?.footer ? (
              <div
                className="footer"
                style={{ justifyContent: justifyFooter, ...footerStyles }}
              >
                {item?.footer}
              </div>
            ) : (
              <></>
            )}
            {/* </> */}
          </div>
        );
      },
    );

  const collapseBtn = useCallback(() => {
    if (isNil(collapse)) return null;
    return withStopPropagation(
      <span className="collapseBtn" onClick={toggle}>
        {visiable ? '+' : '-'}
      </span>,
    );
  }, [collapse, visiable]);

  const cardHeader = (
    <div className="header">
      <span className="label">{label}</span>
      <span className="rightContent">
        {rightExtra}
        {collapseBtn()}
      </span>
    </div>
  );

  const renderChild = () => {
    return (
      <>
        {label && cardHeader}
        {children ? (
          <div style={{ display: bodyDisplay }}>{children}</div>
        ) : (
          <div className="cardBody">
            <div style={{ display: bodyDisplay }}>
              {Array.isArray(list) && getDepth(list) === 1
                ? // list 是一维数组时
                  renderRow(list as CardViewListItemProps[])
                : // list 是二维数组时
                  (list as CardViewListItemProps[][]).map((item, idx) => {
                    return (
                      <CardView
                        key={idx}
                        style={{
                          marginBottom: '.15rem',
                          padding: '.25rem',
                          color: '#fff',
                          fontSize: '24rem',
                          fontFamily: 'PingFangSC-Regular, PingFang SC',
                          boxShadow: '0 2px 8px rgba(0,0,0,.15)',
                        }}
                      >
                        {renderRow(item)}
                      </CardView>
                    );
                  })}
            </div>
          </div>
        )}
        <div
          className="footer"
          style={{ justifyContent: justifyFooter, ...footerStyles }}
        >
          {footer}
        </div>
      </>
    );
  };

  return (
    <section
      id={id}
      className={classnames({
        cardView: true,
        flexRow: flexRow,
        flexColumn: !flexRow,
        hide: hidden,
      })}
      style={style}
      onClick={(e) => onClick?.(e)}
    >
      {swipeActions ? (
        <SwipeAction disabled={swipeDisabled} autoClose right={swipeActions}>
          {renderChild()}
        </SwipeAction>
      ) : (
        renderChild()
      )}
    </section>
  );
};

export default CardView;
