import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import ReactAdminIcons from '@jswork/react-admin-icons';
import { Input } from 'antd';

const CLASS_NAME = 'antbf-search-box';

interface Options {
  field: string;
  formProps: any;
  onSubmit: (event: any) => void;
}

const icon = (inField) => {
  const params = nxHashlize(location.hash);
  const actived = !!nx.get(params, inField);
  return (
    <span className={cx({ 'is-active': actived })}>
      <ReactAdminIcons value="search" />
    </span>
  );
};

const dropdown = (inField, inOnSubmit, inFormProps) => {
  const params = nxHashlize();
  const defValue = nx.get(params, inField);
  return (
    <div className={`${CLASS_NAME}__form`}>
      <Input.Search
        defaultValue={defValue}
        allowClear
        enterButton
        placeholder="请输入关键字"
        {...inFormProps}
        onSearch={(value) => {
          inOnSubmit({ target: { value } });
        }}
      />
    </div>
  );
};

export default class {
  private field;
  private onSubmit;
  private formProps;

  constructor(options: Options) {
    this.field = options.field;
    this.onSubmit = options.onSubmit;
    this.formProps = options.formProps;
  }

  generate() {
    return {
      filterIcon: icon(this.field),
      filterDropdown: dropdown(this.field, this.onSubmit, this.formProps)
    };
  }
}
