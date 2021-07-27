import React, { ReactNode, useRef } from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import ReactAntRadioGroup from '@jswork/react-ant-radio-group';
import RctplAntRadio from '@jswork/rctpl-ant-radio';
import antbf from '@jswork/antbf-abstract';
import { Options } from '@jswork/antbf-types';

import { Form, Button, FormInstance } from 'antd';

const CLASS_NAME = 'antbf-radio-group';

export default class extends antbf.AntbfAbstract {
  dropdown(inField: string, inOptions: Options): ReactNode {
    const params = nxHashlize(location.hash);
    const defValue = nx.get(params, inField);
    const formRef = useRef(null);
    const { items, onSubmit, onChange } = inOptions;
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
        onReset={handleReset}>
        <Form.Item name={inField} initialValue={defValue} noStyle>
          <ReactAntRadioGroup items={items} template={RctplAntRadio} onChange={onChange} />
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
