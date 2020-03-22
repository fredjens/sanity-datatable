import React from 'react';
import { range } from 'lodash';
import PropTypes from 'prop-types';
import Button from 'part:@sanity/components/buttons/default'

import {  Container, Row, Cell, Empty } from './primitives';

const Table = (props) => {
  const {
    data,
    rows,
    columns,
    handleChange,
    onRemoveRow,
    onRemoveColumn,
    onReset
  } = props;

  /**
  * Render rows
  */

  const rowRange = range(rows)
  const rowsList = rowRange.map(rowIndex => (
    <Row key={rowIndex} cols={columns}>
      {range(columns).map(columnIndex => (
        <Cell
          key={columnIndex}
          type='text'
          value={(data[rowIndex] || [])[columnIndex] || ''}
          onChange={(e) => handleChange(e, rowIndex, columnIndex)}
        />
      ))}
      <Button kind='simple' onClick={() => onRemoveRow(rowIndex)} title='Remove this row'>
        -
      </Button>
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
      {rows > 0 && (
        <Row cols={columns}>
          {range(columns).map(columnIndex => (
            <Button
              style={{width: '100%'}}
              key={columnIndex}
              kind='simple'
              title='Remove this column'
              onClick={() => onRemoveColumn(columnIndex)}
            >
              -
            </Button>
          ))}
          <Button
            color='danger'
            onClick={onReset}
            title='Remove all rows and columns'
          >
            &times;
          </Button>
        </Row>
      )}
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
