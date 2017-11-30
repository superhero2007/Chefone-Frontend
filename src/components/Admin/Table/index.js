// @flow

import React from 'react';
// export * as fixtures from './fixtures';
import styles from './index.module.less';
import { fixedCSSModules } from '../../../utils';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import * as BSTable from 'react-bootstrap-table';
const Table = BSTable.BootstrapTable;
const TableHeaderCol = BSTable.TableHeaderColumn;

export type TableColumnnType<T> = {
  dataField: $Keys<T>,
  name: string,
  formatter?: Function,
};

export default fixedCSSModules(styles)(
  <T: Object>({
    array,
    columns,
    onRowClick,
  }: {
    onRowClick?: Function,
    array: Array<T>,
    columns: Array<TableColumnnType<T>>,
  }) => {
    return (
      <div styleName="table">
        <Table options={{ onRowClick }} height={500} data={array} hover={true}>
          {columns.map(({ dataField, name, formatter }, i) => (
            <TableHeaderCol
              styleName="table-column"
              key={i}
              dataFormat={formatter}
              isKey={dataField === 'objectId'}
              dataSort={true}
              dataField={dataField}
            >
              {name}
            </TableHeaderCol>
          ))}
        </Table>
      </div>
    );
  },
);
