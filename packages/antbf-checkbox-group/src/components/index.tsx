import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import form2data from '@jswork/next-form2data';
import ReactAdminIcons from '@jswork/react-admin-icons';
import ReactAntCheckboxGroup from '@jswork/react-ant-checkbox-group';
import { Button } from 'antd';

const CLASS_NAME = 'antbf-checkbox-group';

interface Options {
  onSubmit: (event: any) => void;
  items: any[];
  onChange?: (event: any) => void;
  ctrlProps?: any;
  formProps?: any;
}

const icon = (inField: string) => {
  const params = nxHashlize(location.hash);
  const actived = !!nx.get(params, inField);
  return (
    <span className={cx({ 'is-active': actived })}>
      <ReactAdminIcons value="search" />
    </span>
  );
};

const dropdown = (inField: string, inOptions: Options) => {
  const { items, onChange, onSubmit, ctrlProps, formProps } = inOptions;
  const params = nxHashlize();
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
};

export default class {
  public static get(inField: string, inOptions: Options) {
    return {
      filterIcon: icon(inField),
      filterDropdown: dropdown(inField, inOptions)
    };
  }
}
