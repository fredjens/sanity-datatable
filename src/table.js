import React from 'react';
import { range } from 'lodash';
import PropTypes from 'prop-types';

import {  Container, Row, Cell, Empty } from './primitives';

const Table = (props) => {
  const {
    data,
    rows,
    columns,
    handleChange
  } = props;

  /**
  * Render rows
  */

  const rowsList = range(rows).map(rowIndex => (
    <Row key={rowIndex}>
      {range(columns).map(columnIndex => (
        <Cell
          key={columnIndex}
          type="text"
          value={(data[rowIndex] || [])[columnIndex] || ''}
          onChange={(e) => handleChange(e, rowIndex, columnIndex)}
        />
      ))}
    </Row>
  ));

  /**
   * Render
   */

  return (
    <Container>
      {rows === 0 && (
        <Empty children="Empty table" />
      )}
      {rowsList}
    </Container>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  rows: PropTypes.number,
  columns: PropTypes.number,
  handleChange: PropTypes.func,
};

export default Table;
