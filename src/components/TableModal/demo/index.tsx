import IconTrashcan from '@/assets/trashcan.png';
import type { IFormItemProps } from '@alitajs/dform';
import { TableModal } from 'Rmobile';
import React, { FC, useState } from 'react';
import './index.less';

const Page: FC = () => {
  const [value, setValue] = useState<Array<Record<string, any>>>([]);

  const data = [
    {
      type: 'input',
      placeholder: '请输入',
      title: '姓名',
      required: true,
      fieldProps: 'userName',
    },
    {
      type: 'radio',
      placeholder: '请选择',
      fieldProps: 'userSexs',
      data: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
      title: '性别',
    },
    {
      type: 'picker',
      placeholder: '请选择',
      fieldProps: 'identity',
      data: [
        {
          label: '学生',
          value: '1',
        },
        {
          label: '上班族',
          value: '2',
        },
        {
          label: '公务员',
          value: '3',
        },
      ],
      title: '身份',
    },
  ] as IFormItemProps[];
  const onDelete = (data: IFormItemProps[], index: number) => {
    setValue((it) => {
      return it.filter((val, idx) => idx !== index);
    });
  };

  return (
    <div className="tableModalDemo">
      <TableModal
        title={'用户模板'}
        data={data}
        customButton={[
          {
            onClick: () => {
              setValue((item) => {
                return item.concat(() => {
                  let valJson: Record<string, any> = {};
                  data.forEach((i: IFormItemProps) => {
                    if (i?.fileProps) valJson[i?.fileProps] = undefined;
                  });
                  return valJson;
                });
              });
            },
            text: '增加',
            size: 'md',
            type: 'default',
            disabled: false,
          },
        ]}
        value={value}
        onChange={(value: Record<string, any>[]) => {
          setValue(value);
        }}
        extra={(formsData, index) => {
          return (
            <img
              className="iconTrashcan"
              src={IconTrashcan}
              alt="删除"
              onClick={() => {
                if (onDelete) onDelete(formsData, index);
              }}
            />
          );
        }}
      ></TableModal>
    </div>
  );
};

export default Page;
