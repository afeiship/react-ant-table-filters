import React, { ReactNode, useRef } from 'react';
import nx from '@jswork/next';
import hashlize from '@jswork/next-hashlize';
import ReactAntCheckboxGroup from '@jswork/react-ant-checkbox-group';
import { Form, Button, FormInstance } from 'antd';
import { Options } from '@jswork/antbf-types';
import antbf from '@jswork/antbf-abstract';

const CLASS_NAME = 'antbf-checkbox-group';

export default class extends antbf.AntbfAbstract {
  dropdown(inField: string, inOptions: Options): ReactNode {
    const { items, onChange, onSubmit, ctrlProps, formProps } = inOptions;
    const formRef = useRef(null);
    const params = hashlize(location.hash);
    const urlstr = nx.get(params, inField);
    const defValue = urlstr ? urlstr.split(',') : [];
    const handleSubmit = (inEvent) => {
      const value = inEvent[inField];
      onSubmit({ target: { value } });
    };

    const handleReset = () => {
      const value = (formRef.current! as FormInstance).getFieldValue(inField);
      const target = { target: { value } };
      onChange!(target);
      onSubmit!(target);
    };

    return (
      <Form
        ref={formRef}
        className={`${CLASS_NAME}__form`}
        onFinish={handleSubmit}
        onReset={handleReset}
        {...formProps}>
        <Form.Item noStyle name={inField} initialValue={defValue}>
          <ReactAntCheckboxGroup items={items} onChange={onChange} {...ctrlProps} />
        </Form.Item>
        <Form.Item noStyle>
          <div className="is-actions">
            <Button size="small" type="primary" htmlType="submit">
              确定
            </Button>
            <Button size="small" htmlType="reset">
              重置
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}
