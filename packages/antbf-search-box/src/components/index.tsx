import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import form2data from '@jswork/next-form2data';
import ReactAdminIcons from '@jswork/react-admin-icons';
import { Input } from 'antd';

const CLASS_NAME = 'antbf-search-box';

interface Options {
  onSubmit: (event: any) => void;
  onChange?: (event: any) => void;
  ctrlProps?: any;
  formProps?: any;
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

const dropdown = (inField: string, inOptions: Options) => {
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
};

export default class {
  public static get(inField: string, inOptions: Options) {
    return {
      filterIcon: icon(inField),
      filterDropdown: dropdown(inField, inOptions)
    };
  }
}
