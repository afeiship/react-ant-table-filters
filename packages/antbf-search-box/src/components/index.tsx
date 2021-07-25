import React, { ReactNode } from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import { Input } from 'antd';
import { GroupOptions } from '@jswork/antbf-types';
import antbf from '@jswork/antbf-abstract';

const CLASS_NAME = 'antbf-search-box';

export default class extends antbf.AntbfAbstract {
  dropdown(inField: string, inOptions: GroupOptions): ReactNode {
    const params = nxHashlize();
    const defValue = nx.get(params, inField);
    const { onChange, onSubmit, formProps, ctrlProps } = inOptions;

    return (
      <div className={`${CLASS_NAME}__form`} {...formProps}>
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
      </div>
    );
  }
}
