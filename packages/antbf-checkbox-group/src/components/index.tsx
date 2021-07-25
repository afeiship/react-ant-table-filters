import React, { ReactNode } from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import form2data from '@jswork/next-form2data';
import ReactAntCheckboxGroup from '@jswork/react-ant-checkbox-group';
import { Button } from 'antd';
import { GroupOptions } from '@jswork/antbf-types';
import antbf from '@jswork/antbf-abstract';

const CLASS_NAME = 'antbf-checkbox-group';

export default class extends antbf.AntbfAbstract {
  dropdown(inField: string, inOptions: GroupOptions): ReactNode {
    const { items, onChange, onSubmit, ctrlProps, formProps } = inOptions;
    const params = nxHashlize(location.hash);
    const urlstr = nx.get(params, inField);
    const defValue = urlstr ? urlstr.split(',') : [];
    const handleSubmit = (inEvent) => {
      const fd = new FormData(inEvent.target);
      const obj = form2data(fd);
      const value = obj[inField];
      inEvent.preventDefault();
      onSubmit({ target: { value } });
    };

    return (
      <form className={`${CLASS_NAME}__form`} onSubmit={handleSubmit} {...formProps}>
        <ReactAntCheckboxGroup
          items={items}
          name={inField}
          defaultValue={defValue}
          {...ctrlProps}
          onChange={onChange}
        />
        <div className="is-actions">
          <Button size="small" type="primary" htmlType="submit">
            确定
          </Button>
        </div>
      </form>
    );
  }
}
