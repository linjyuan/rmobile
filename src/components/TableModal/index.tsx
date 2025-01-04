import FooterViews from '@/components/FooterBtn';
import { isNil } from '@/utils';
import type {
  IFormItemProps,
  Store,
  ValidateErrorEntity,
} from '@alitajs/dform';

import editIcon from '@/assets/editIcon.png';
import DynamicForm, { useForm } from '@alitajs/dform';
import { Modal, Toast } from 'antd-mobile';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Button from '../Button';
import './index.less';
import {
  FormsValuesArrItemData,
  ModalInputCardProps,
  TableModalRef,
} from './interface';

const TableModal = forwardRef<TableModalRef, ModalInputCardProps>(
  (props, ref) => {
    const {
      title = '',
      disabled,
      data = [],
      value: initValue = [],
      onChange,
      isNullable = false,
      customButton = [],
      onCancel,
      onDefine,
      subTitle,
      extra,
    } = props;

    // const domElem = document.querySelectorAll(`#alita-dform-${key}`);
    // 表单的data
    const [inputCardField, setInputCardField] = useState<IFormItemProps[][]>(
      [],
    );
    // 是否展示弹窗
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [form] = useForm();
    // 选中的form表单内容
    const [formsValues, setFormsValues] = useState<any>({});
    // dform 的数据下标
    const [openIndex, setOpenIndex] = useState<number>(0);
    const inputCardFieldIndex = useRef<any>(0);
    // 存放多个表单数据
    const [formsValuesArr, setFormsValuesArr] = useState<
      FormsValuesArrItemData[]
    >([]);

    useEffect(() => {
      let val: FormsValuesArrItemData[] = initValue ? initValue : [];
      if (typeof initValue === 'string') {
        try {
          val = JSON.parse(initValue);
        } catch (error) {}
      }
      // 设置表单值
      if (val?.length === 0) {
        let emptyValue: Record<string, any> = {};
        data.forEach((it) => {
          if (it?.fieldProps) emptyValue[it?.fieldProps] = undefined;
          if (it?.fieldProps2) emptyValue[it?.fieldProps2] = undefined;
        });
        val.push(emptyValue);
      }
      setFormsValuesArr(val);
      if (val && Array.isArray(val) && val.length > 0 && Array.isArray(data)) {
        // 设置表单
        setInputCardField(Array(val.length).fill(data));
      }
    }, [JSON.stringify(initValue), JSON.stringify(data)]);

    const onFinish = (values: Store) => {
      const newValue = { ...values };
      setFormsValues({
        ...newValue,
      });
      const targetValues = { ...newValue };
      console.log({ formsValuesArr });
      const temp = [
        // @ts-ignore
        ...formsValuesArr?.map((item, idx) =>
          idx === openIndex ? { ...item, ...targetValues } : item,
        ),
      ];
      setFormsValuesArr([...temp]);
      console.log({ temp });
      if (onChange) onChange(temp);
      if (onDefine) onDefine(values, temp);
      setIsShowModal(false);
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
      const { errorFields } = errorInfo;
      if (errorFields.length > 0) {
        const { errors = [] } = errorFields[0];
        if (errors.length > 0) {
          Toast.show({
            icon: 'fail',
            content: errors[0],
          });
        }
      }
    };

    useImperativeHandle(ref, () => ({
      validate() {
        return new Promise((resolve, reject) => {});
      },
      getValue() {
        return formsValuesArr;
      },
      add() {},
      remove() {},
      relativeFieldset() {},
    }));

    // 页面上的表单
    const elem = (formsData: IFormItemProps[], index: number) => {
      return (
        <div className="tableModalForm">
          <div className="titleContent">
            <div
              onClick={() => {
                console.log({ index });
                setOpenIndex(index);
                console.log({ inputCardField: inputCardField[index] });
                inputCardFieldIndex.current = index;
                setIsShowModal(true);
              }}
            >
              {!isNil(isNullable) && !isNullable ? (
                <span className="alitajs-dform-redStar">*</span>
              ) : null}
              <span className="title">{title}</span>
              {subTitle ? subTitle : null}
              <img
                className="iconArrowGray"
                style={{
                  filter: disabled ? 'grayscale(100%)' : 'grayscale(0%)',
                }}
                src={editIcon}
                alt="弹出输入表单"
              />
            </div>
            {extra ? extra(formsData, index) : null}
          </div>
          <div className="mainContent">
            {Array.isArray(formsData) &&
              formsData?.map((item, i) => {
                if (item.hidden) return null;
                return (
                  <div className="item" key={i}>
                    <span className="itemTitle">{`${item.title}：`}</span>
                    <span className="itemValue">
                      {/* TODO: 待修复 */}
                      {`${
                        (formsValuesArr.length &&
                          formsValuesArr[index] &&
                          item.fieldProps &&
                          formsValuesArr[index][item.fieldProps]) ||
                        '- -'
                      }`}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      );
    };

    return (
      <>
        <div>
          {inputCardField.map((inputCard, index) => {
            return <div key={index}>{elem(inputCard, index)}</div>;
          })}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              // justifyContent: 'space-between',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            {customButton.map((i, index) => {
              return <Button {...i} key={index}></Button>;
            })}
          </div>
        </div>
        <Modal
          visible={isShowModal}
          title="请输入"
          onClose={() => setIsShowModal(false)}
          bodyClassName="modalClass"
          content={
            <>
              <DynamicForm
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                formsValues={formsValuesArr[openIndex]}
                data={inputCardField[openIndex]}
                form={form}
              />
              <FooterViews
                list={[
                  {
                    title: '取消',
                    key: '1',
                    type: 'normal',
                    onPress: () => {
                      if (onCancel) {
                        onCancel(form.getFieldsValue(), formsValuesArr);
                      }
                      setIsShowModal(false);
                      // 点击取消修改回来样式
                    },
                  },
                  {
                    title: '确认',
                    key: '2',
                    type: 'positive',
                    onPress: () => {
                      form.submit();
                    },
                  },
                ]}
              />
            </>
          }
        ></Modal>
      </>
    );
  },
);

export default TableModal;
