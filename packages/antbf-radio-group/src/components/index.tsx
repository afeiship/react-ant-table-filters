import cx from 'classnames';
import React from 'react';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import ReactAdminIcons from '@jswork/react-admin-icons';
import ReactAntRadioGroup from '@jswork/react-ant-radio-group';
import RctplAntRadio from '@jswork/rctpl-ant-radio';

import { Input, Button } from 'antd';

const CLASS_NAME = 'antbf-raido-group';

interface Options {
  field: string;
  onSubmit: (event: any) => void;
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

const dropdown = (inField, inOnSubmit, inFormProps) => {
  const params = nxHashlize();
  const defValue = nx.get(params, inField);
  const items = [
    { value: 'k1', label: 'label1' },
    { value: 'k2', label: 'label2' },
    { value: 'k3', label: 'label3' }
  ];

  return (
    <div className={`${CLASS_NAME}__form`}>
      <ReactAntRadioGroup
        items={items}
        template={RctplAntRadio}
        defaultValue={defValue}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <div className="is-actions">
        <Button size="small" type="primary">
          确定
        </Button>
        <Button size="small">重置</Button>
      </div>
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
