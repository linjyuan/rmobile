import { UploadView } from 'Rmobile';
import React from 'react';
const page = () => {
  return (
    <div>
      <UploadView
        title="其他附件"
        value={[]}
        maxLength={10}
        onChange={() => {}}
        disabled={false}
        multiple={true}
        // type={'image'}
        accept={'请上传附件'}
      ></UploadView>
    </div>
  );
};

export default page;
