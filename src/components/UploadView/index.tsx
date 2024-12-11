import IconUploadPng from '@/assets/upload-icon.png';
import React, { FC } from 'react';
import './index.less';

interface file {
  fileName: string;
}
interface UploadViewProps {
  value?: file[];
  showUI?: boolean;
  hasStar?: boolean;
  title: string;
  disabled?: boolean;
  maxLength: number;
  onChange: (file: any) => void;
  beforeOnChange?: () => void;
  IconUpload?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  coverStyle?: React.CSSProperties;
  accept?: string;
}

const UploadView: FC<UploadViewProps> = (props) => {
  const {
    value = [],
    showUI = true,
    hasStar = false,
    title,
    disabled = false,
    maxLength,
    onChange,
    beforeOnChange,
    IconUpload = IconUploadPng,
    multiple = true,
    children,
    coverStyle,
    accept,
  } = props;
  const type = 'image';
  const hint = true;
  return (
    <div className="antd-moblie-max-uploadView" style={coverStyle}>
      {title ? (
        <div className="alitajs-dform-title alitajs-dform-vertical-title">
          {hasStar && <div className="alitajs-dform-redStar">*</div>}
          <div>{title}</div>
        </div>
      ) : null}
      {showUI && (
        <div
          className="antd-moblie-max-wrapper"
          style={{ filter: disabled ? 'grayscale(100%)' : 'grayscale(0%)' }}
        >
          <input
            disabled={disabled}
            multiple={multiple}
            hidden={maxLength <= value.length}
            type="file"
            accept={accept}
            className="antd-moblie-max-inputFile"
            onClick={(e: any) => {
              e.target.value = null;
              beforeOnChange?.();
            }}
            onChange={onChange}
          />
          <img className="antd-moblie-max-icon" src={IconUpload} alt="" />
          <div
            hidden={maxLength <= value.length}
            className="antd-moblie-max-dis"
          >
            {hint &&
              `点击此处添加${type === 'image' ? '图片' : '文件'},单个${
                type === 'image' ? '图片' : '文件'
              }
          小于200M`}
          </div>
          <div
            hidden={maxLength > value.length}
            style={{ color: '#f33' }}
            className="antd-moblie-max-dis"
          >
            最多可选择{maxLength}
            {type === 'image' ? '张图片' : '个文件'}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default UploadView;
