import React, { FC, useEffect } from 'react';

import './index.less';
import { CapsuleProps } from './PropsType';

const Capsule: FC<CapsuleProps> = (props) => {
  const { style } = props;

  useEffect(() => {
    console.log('finish');
  }, []);

  return <div style={style}>sssss</div>;
};

export default Capsule;
