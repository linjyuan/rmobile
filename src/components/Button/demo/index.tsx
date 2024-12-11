import { Button, CardView } from 'Rmobile';
import React from 'react';
import './index.less';
const Page = () => {
  return (
    <div>
      <CardView label="填充模式">
        <Button color="primary" fill="solid">
          solid
        </Button>
        <Button color="primary" fill="outline">
          outline
        </Button>
        <Button color="primary" fill="none">
          none
        </Button>
      </CardView>
      <CardView label="按钮类型">
        <Button color="primary">primary</Button>
        <Button color="success">success</Button>
        <Button color="warning">warning</Button>
        <Button color="danger">danger</Button>
      </CardView>

      <CardView label="块级按钮">
        <Button color="primary" size="large" block>
          块级按钮
        </Button>
      </CardView>
      <CardView label="按钮尺寸">
        <Button size="mini" color="primary">
          warn
        </Button>
        <Button size="small" color="success">
          warn
        </Button>
        <Button size="middle" color="warning">
          warn
        </Button>
        <Button size="large" color="danger">
          warn
        </Button>
      </CardView>
    </div>
  );
};

export default Page;
