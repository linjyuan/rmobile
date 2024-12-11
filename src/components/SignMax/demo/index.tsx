import { CanvasDataMap, SignMax } from 'Rmobile';
import React, { useState } from 'react';

const Page = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState('');
  return (
    <div>
      <SignMax
        visible={visible}
        onSubmit={(file: string, base64: CanvasDataMap) => {
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
