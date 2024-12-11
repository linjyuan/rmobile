import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonProps = {
  style?: React.CSSProperties;
  className?: string;
  color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'positive'
    | 'negative'
    | 'other';
  fill?: 'solid' | 'outline' | 'none';
  size?: 'mini' | 'small' | 'middle' | 'large';
  block?: boolean;
  loading?: boolean | 'auto';
  loadingText?: string;
  loadingIcon?: ReactNode;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | Promise<void>;
  type?: 'submit' | 'reset' | 'button';
  shape?: 'default' | 'rounded' | 'rectangular';
  children?: ReactNode;
} & Pick<
  NativeButtonProps,
  'onMouseDown' | 'onMouseUp' | 'onTouchStart' | 'onTouchEnd' | 'id'
>;
