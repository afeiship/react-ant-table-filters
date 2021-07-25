import React, { ReactNode } from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import form2data from '@jswork/next-form2data';
import ReactAntRadioGroup from '@jswork/react-ant-radio-group';
import RctplAntRadio from '@jswork/rctpl-ant-radio';
import antbf from '@jswork/antbf-abstract';
import { GroupOptions } from '@jswork/antbf-types';

import { Button } from 'antd';

const CLASS_NAME = 'antbf-radio-group';

export default class extends antbf.AntbfAbstract {
  dropdown(inField: string, inOptions: GroupOptions): ReactNode {
    const params = nxHashlize();
    const defValue = nx.get(params, inField);
    const { items, onSubmit, onChange } = inOptions;
    const handleSubmit = (inEvent) => {
      const fd = new FormData(inEvent.target);
      const obj = form2data(fd);
      const value = obj[inField];
      inEvent.preventDefault();
      onSubmit({ target: { value } });
    };

    return (
      <form className={`${CLASS_NAME}__form`} onSubmit={handleSubmit}>
        <ReactAntRadioGroup
          items={items}
          name={inField}
          template={RctplAntRadio}
          defaultValue={defValue}
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
