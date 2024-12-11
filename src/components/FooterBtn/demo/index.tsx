import React from 'react';
import { CardView, FooterBtn } from 'Rmobile';

const Page = () => {
  return (
    <div>
      <CardView label="样式">
        <FooterBtn
          list={[
            {
              title: '返回',
              key: '返回',
              type: 'default',
              onPress: () => {},
            },
            {
              title: '预览',
              key: '预览',
              type: 'other',
              onPress: () => {},
            },
            {
              title: '取消',
              key: '取消',
              type: 'danger',
              onPress: () => {},
            },
            {
              title: '关闭',
              key: '关闭',
              type: 'warning',
              onPress: () => {},
            },
          ]}
        />
        <FooterBtn
          list={[
            {
              title: '重置',
              key: '重置',
              type: 'normal',
              onPress: () => {},
            },
            {
              title: '确定',
              key: '确定',
              type: 'negative',
              onPress: () => {},
            },
            {
              title: '提交',
              key: '提交',
              type: 'positive',
              onPress: () => {},
            },
          ]}
        />
      </CardView>
      <FooterBtn
        list={[
          {
            title: '提交修改',
            key: '1',
            onPress: () => {},
          },
        ]}
      ></FooterBtn>
      <FooterBtn
        list={[
          {
            title: '取消',
            key: '取消',
            type: 'danger',
            onPress: () => {},
          },
          {
            title: '确定',
            key: '确定',
            onPress: () => {},
          },
        ]}
      ></FooterBtn>
    </div>
  );
};

export default Page;
