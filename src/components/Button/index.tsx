import { isPromise } from '@/utils';
import classNames from 'classnames';
import React, { FC, MouseEventHandler, useState } from 'react';
import { ButtonProps } from './PropsType';
import './index.less';
const classPrefix = 'rmobile-button';

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    color,
    block,
    disabled,
    fill,
    size,
    loading,
    loadingText,
    loadingIcon,
    style = {},
    shape,
    type,
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    onTouchStart,
    className,
  } = props;

  const [innerLoading, setInnerLoading] = useState(false);
  const initLoading = loading === 'auto' ? innerLoading : loading;
  const initDisabled = disabled || initLoading;

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!onClick) return;
    const promise = onClick(e);
    if (isPromise(promise)) {
      try {
        setInnerLoading(true);
        await promise;
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      style={style}
      className={classNames(
        classPrefix,
        {
          [`${classPrefix}-${color}`]: color,
          [`${classPrefix}-block`]: block,
          [`${classPrefix}-disabled`]: initDisabled,
          [`${classPrefix}-fill-outline`]: fill === 'outline',
          [`${classPrefix}-fill-none`]: fill === 'none',
          [`${classPrefix}-mini`]: size === 'mini',
          [`${classPrefix}-small`]: size === 'small',
          [`${classPrefix}-large`]: size === 'large',
          [`${classPrefix}-loading`]: initLoading,
          [`${classPrefix}-shape-${shape}`]: !!shape,
        },
        className,
      )}
      disabled={initDisabled}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {initLoading ? (
        <div className={`${classPrefix}-loading-wrapper`}>
          {loadingIcon}
          {loadingText}
        </div>
      ) : (
        <span>{props.children}</span>
      )}
    </button>
  );
};

export default Button;

// 轻量
