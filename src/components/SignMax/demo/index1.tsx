import { CanvasDataMap, SignMax } from 'Rmobile';
import { Button, Image } from 'antd-mobile';
import React, { useState } from 'react';

const Page = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState('');
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setVisible(true);
        }}
      >
        去签名
      </Button>
      {imgSrc && <Image src={imgSrc}></Image>}
      <SignMax
        visible={visible}
        onSubmit={(file: string, base64: CanvasDataMap[]) => {
          console.log(base64);
          setImgSrc(file);
          setVisible(false);
        }}
        signName={'林某源'}
        // signName={'企业家'}
        onClose={() => setVisible(false)}
      ></SignMax>
    </div>
  );
};

export default Page;
