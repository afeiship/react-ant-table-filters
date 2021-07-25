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
  field: string;
  onSubmit: (event: any) => void;
  items: any[];
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

const dropdown = (inField, inOptions) => {
  const { items, onChange, onSubmit, ctrlProps, formProps } = inOptions;
  const params = nxHashlize();
  const urlstr = nx.get(params, inField);
  const defValue = urlstr ? urlstr.split(',') : [];
  const handleSubmit = (inEvent) => {
    const fd = new FormData(inEvent.target);
    const obj = form2data(fd);
    const target = obj[inField];
    inEvent.preventDefault();
    onSubmit({ target });
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
        <Button size="small" htmlType="reset">
          重置
        </Button>
      </div>
    </form>
  );
};

export default class {
  private field;
  private items;
  private onSubmit;
  private onChange;
  private ctrlProps;
  private formProps;

  constructor(options: Options) {
    this.field = options.field;
    this.items = options.items;
    this.onSubmit = options.onSubmit;
    this.onChange = options.onChange;
    this.ctrlProps = options.ctrlProps;
    this.formProps = options.formProps;
  }

  generate() {
    return {
      filterIcon: icon(this.field),
      filterDropdown: dropdown(this.field, {
        items: this.items,
        onSubmit: this.onSubmit,
        onChange: this.onChange,
        ctrlProps: this.ctrlProps,
        formProps: this.formProps
      })
    };
  }
}
