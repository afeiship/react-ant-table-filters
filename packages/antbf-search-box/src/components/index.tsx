import React, { ReactNode } from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import form2data from '@jswork/next-form2data';
import { Input } from 'antd';
import { GroupOptions } from '@jswork/antbf-types';
import antbf from '@jswork/antbf-abstract';

const CLASS_NAME = 'antbf-search-box';

export default class extends antbf.AntbfAbstract {
  dropdown(inField: string, inOptions: GroupOptions): ReactNode {
    const params = nxHashlize();
    const defValue = nx.get(params, inField);
    const { onChange, onSubmit, formProps, ctrlProps } = inOptions;
    const handleSubmit = (inEvent) => {
      const fd = new FormData(inEvent.target);
      const obj = form2data(fd);
      const value = obj[inField];
      inEvent.preventDefault();
      onSubmit({ target: { value } });
    };

    return (
      <form className={`${CLASS_NAME}__form`} onSubmit={handleSubmit} {...formProps}>
        <Input.Search
          defaultValue={defValue}
          allowClear
          enterButton
          placeholder="请输入关键字"
          onChange={onChange}
          onSearch={(value) => {
            onSubmit({ target: { value } });
          }}
          {...ctrlProps}
        />
      </form>
    );
  }
}
