import DynamicForm, { IFormItemProps, Store, useForm } from '@alitajs/dform';
import React, { forwardRef, useImperativeHandle } from 'react';

interface SmallTableProps {
  value?: Record<string, any>;
  formDataConfig: IFormItemProps[];
}

interface SmallTableRef {
  validate: () => Promise<unknown>;
  onFinish: (alues: Store) => void;
}

const SmallTable = forwardRef<SmallTableRef, SmallTableProps>((props, ref) => {
  const { formDataConfig, value = {} } = props;
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log({ values });
  };
  const onFinishFailed = () => {};
  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    failScroll: false,
    autoLineFeed: true,
    data: formDataConfig,
    formsValues: value,
  };

  useImperativeHandle(ref, () => ({
    onFinish,
    validate: () => {
      return new Promise((resolve) => {
        form
          .validateFields()
          .then(() => {
            resolve({ state: true, err: undefined });
          })
          .catch((err) => {
            resolve({ state: false, err });
          });
      });
    },
  }));

  return <DynamicForm {...formProps}></DynamicForm>;
});

export default SmallTable;
