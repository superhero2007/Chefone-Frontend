//@flow

import React from 'react';
export * as fixtures from './fixtures';
import {
  compose,
  converge,
  call,
  prop,
  pipe,
  not,
  identity,
  isNil,
} from 'ramda';
import cx from 'classnames';
import { withHandlers, defaultProps } from 'recompose';

import withSimpleState from '../../../../utils/withSimpleState';
import type { Changeble } from '../../../../utils/withSimpleState';
import { fixedCSSModules } from '../../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });

export const DropdownItem = applyStyles(
  ({ children, isDefault = false, ...propsT }) => (
    <p
      styleName={cx('dropdown-item', {
        'item-default': isDefault,
        'item-active': !isDefault,
      })}
      {...propsT}
    >
      {children}
    </p>
  ),
);

const Chevron = applyStyles(() => (
  <i className="fa fa-chevron-down" styleName="chevron-icon" />
));

const Option = applyStyles(
  ({
    children,
    onClick,
    ...propsT
  }: {
    children: any,
    onClick?: any,
    propsT?: any,
  }) => (
    <li styleName="option" onClick={onClick} {...propsT}>
      {children}
    </li>
  ),
);

const selectMap = value => <option value={value}>{value}</option>;

const changeBool = converge(call, [prop('onChange'), pipe(prop('value'), not)]);

export type PropsT<T> = {
  options: Array<T>,
  elements?: boolean,
  theme?: Object,
  selected?: Changeble<T>,
  tabIndex: number,
  defaultIndex: number,
  toggleDropdown?: string,
  defaultValue?: T,
  Item?: Component$<*, *>,
  name?: string,
  printWith?: Function,
};

type InnerPropsT<T> = PropsT<T> & {
  printWith: Function,
  isActive: Changeble<boolean>,
  closeDropdown: Function,
  toggleDropdown: Function,
  optionsMap: Function,
  onBlur: Function,
};

const DropdownPlus: Component$<PropsT<*>, *> = compose(
  defaultProps({
    className: '',
    defaultValue: null,
    defaultIndex: null,
    Item: DropdownItem,
    name: '',
    printWith: identity,
  }),
  withSimpleState('isActive', () => false),
  withHandlers({
    closeDropdown: ({ isActive }) => () => {
      if (isActive.value !== false) {
        isActive.onChange(false);
      }
    },
  }),
  withHandlers({
    toggleDropdown: ({ isActive }) => () => changeBool(isActive),
    optionsMap: ({ selected, closeDropdown, Item, printWith }) => value => {
      const toPrint = printWith(value);
      return (
        <Option
          onClick={() => {
            selected && selected.onChange(value);
            closeDropdown();
          }}
        >
          <Item value={toPrint}>{toPrint}</Item>
        </Option>
      );
    },

    onBlur: ({ closeDropdown }) => () => setTimeout(closeDropdown, 300),
  }),
  applyStyles,
)(
  ({
    isActive,
    options,
    elements, //$FlowIssue
    selected,
    tabIndex,
    optionsMap,
    onBlur,
    toggleDropdown,
    defaultValue = '',
    defaultIndex,
    theme = {},
    Item,
    name, //$FlowIssue
    printWith,
    ...propsT
  }: InnerPropsT<*>) => {
    const hasValue = selected && !isNil(selected.value);

    if (selected && !hasValue && !defaultValue && !isNil(defaultIndex)) {
      const selectedItem = options[defaultIndex];
      setTimeout(selected.onChange, 20, selectedItem);
    }

    if (elements) {
      return (
        <div
          styleName="component"
          className={theme.component}
          tabIndex={tabIndex}
          onBlur={onBlur}
        >
          <div styleName="select-styled" onClick={toggleDropdown}>
            <div styleName="selected">{defaultValue || ''}</div>
            <Chevron />
          </div>
          <ul
            styleName={cx('options', {
              inactive: !isActive.value,
            })}
          >
            {options}
          </ul>
        </div>
      );
    }

    const isDefault = !(hasValue && printWith(selected.value));

    return (
      <div
        styleName="component"
        className={theme.component}
        tabIndex={tabIndex}
        onBlur={onBlur}
      >
        <select
          name={name}
          defaultValue=""
          value={(selected && selected.value) || ''}
          styleName="select-hidden"
          {...propsT}
        >
          {(!isDefault ? options : ['', ...options])
            .map(printWith)
            .map(selectMap)}
        </select>
        <div
          styleName="select-styled"
          className={theme['select-styled']}
          onClick={toggleDropdown}
        >
          <div
            styleName={`selected ${isDefault ? 'select-default' : ''}`}
            className={`${theme['selected']} ${
              isDefault ? theme['select-default'] : ''
            }`}
          >
            {(hasValue && printWith(selected.value)) || defaultValue}
          </div>
          <Chevron />
        </div>
        <ul
          styleName={cx('options', {
            inactive: !isActive.value,
          })}
        >
          {defaultValue && (
            <Option>
              {Item && (
                <Item isDefault={true} readOnly={true} value={defaultValue}>
                  {defaultValue}
                </Item>
              )}
            </Option>
          )}
          {options.map(optionsMap)}
        </ul>
      </div>
    );
  },
);

export default DropdownPlus;
