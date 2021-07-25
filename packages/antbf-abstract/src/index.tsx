import cx from 'classnames';
import React, { ReactNode } from 'react';
import ReactAdminIcons from '@jswork/react-admin-icons';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import { GroupOptions } from '@jswork/antbf-types';

export const icon = (inField: string, inOptions: GroupOptions) => {
  const params = nxHashlize(location.hash);
  const actived = !!nx.get(params, inField);
  const { icon } = inOptions;
  return (
    <span className={cx('antbf-icon', { 'is-active': actived })}>
      <ReactAdminIcons value={icon} />
    </span>
  );
};

export class AntbfAbstract {
  public static get(inField: string, inOptions: GroupOptions) {
    const instance = new this();
    return {
      filterIcon: icon(inField, inOptions),
      filterDropdown: instance.dropdown(inField, inOptions)
    };
  }

  dropdown(inField: string, inOptions: GroupOptions): ReactNode {
    console.log(inField, inOptions);
    return null;
  }
}
