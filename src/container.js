/**
 * Import dependencies
 */

import React, { Component } from "react";
import { cloneDeep, range } from "lodash";
import uuid from "uuid";

import PatchEvent, {
  set,
  unset,
  setIfMissing,
} from "part:@sanity/form-builder/patch-event";

import { Heading } from "./primitives";
import Table from "./table";
import Button from "part:@sanity/components/buttons/default";
import ButtonGrid from "part:@sanity/components/buttons/button-grid";

/**
 * Container
 */

class Container extends Component {
  constructor(props) {
    super(props);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
    this.handleCellChange = this.handleCellChange.bind(this);

    const { value: { rows = [] } = {} } = props;

    /**
     * Find out how many rows we have
     */

    const columns = rows.map((row) =>
      !row ? 0 : !row.cells ? 0 : row.cells.length
    );

    /**
     * Set rows and columns
     */

    this.state = {
      columns: Math.max(...columns, 0),
      rows: rows.length,
    };
  }

  /**
   * Add rows and columns
   */

  handleAddRow(type) {
    const { rows, columns } = this.state;

    this.setState({
      rows: rows + 1,
      columns: columns === 0 ? 1 : columns,
    });
  }

  handleAddColumn() {
    const { columns, rows } = this.state;

    this.setState({
      columns: columns + 1,
      rows: rows === 0 ? 1 : rows,
    });
  }

  handleClear = () => {
    const value = cloneDeep(this.props.value);
    this.props.onChange(
      PatchEvent.from([
        setIfMissing({ _type: "table" }),
        set({
          ...value,
          rows: value.rows.map((r) => {
            return {
              ...r,
              cells: r.cells.map((c) => ""),
            };
          }),
        }),
      ])
    );
  };

  handleRemoveRow = (index) => {
    const value = cloneDeep(this.props.value);
    this.props.onChange(
      PatchEvent.from([
        setIfMissing({ _type: "table" }),
        set({
          ...value,
          rows: value.rows.filter((r, i) => i !== index),
        }),
      ])
    );
    this.setState({
      rows: this.state.rows - 1,
    });
  };

  handleReset = (index) => {
    const value = cloneDeep(this.props.value);
    this.props.onChange(
      PatchEvent.from([
        setIfMissing({ _type: "table" }),
        set({ ...value, rows: [] }),
      ])
    );
    this.setState({
      rows: 0,
      columns: 0,
    });
  };

  handleRemoveColumn = (index) => {
    const value = cloneDeep(this.props.value);
    this.props.onChange(
      PatchEvent.from([
        setIfMissing({ _type: "table" }),
        set({
          ...value,
          rows: value.rows.map((r) => {
            return {
              ...r,
              cells: r.cells.filter((c, i) => i !== index),
            };
          }),
        }),
      ])
    );
    this.setState({
      columns: this.state.columns - 1,
    });
  };

  /**
   * Add a patch event to Sanity
   */

  handleCellChange(e, row, column) {
    const { value: input } = e.target;

    const { onChange, value, type: { name } = {} } = this.props;

    /**
     * Get all table data
     */

    let updatedData = cloneDeep(value) || {};

    /**
     * Convert all null values to strings
     */

    const convertNulls = (rows = []) =>
      range(rows.length).map((index) => {
        const row = rows[index];

        return {
          _type: row && row._type ? row._type : "column",
          _key: row && row._key ? row._key : uuid.v4(),
          cells:
            row && row.cells
              ? range(row.cells.length).map((cellIndex) => {
                  const cell = row.cells[cellIndex];
                  return cell ? cell : "";
                })
              : [],
        };
      });

    updatedData.rows = convertNulls(updatedData.rows);

    /**
     * Add rows if not existing
     */

    if (!updatedData.rows[row]) {
      updatedData.rows[row] = {
        _type: "column",
        _key: uuid.v4(),
        cells: [],
      };
    }

    /**
     * Add new values do data
     */

    updatedData.rows[row].cells[column] = input;

    /**
     * Check for null values again
     */

    updatedData.rows = convertNulls(updatedData.rows);

    /**
     * Add Sanity patch
     */

    onChange(
      PatchEvent.from([
        setIfMissing({ _type: "table" }),
        updatedData ? set(updatedData) : unset(name),
      ])
    );
  }

  render() {
    const {
      value: { rows: rowsContent = [] } = {},
      type: { title } = {},
    } = this.props;

    const { columns, rows } = this.state;

    /**
     * Map data to multidimensional array
     * [[0, 1], [2, 3]]
     */

    const tableData = rowsContent.map((row) => row && row.cells && row.cells);

    /**
     * Render
     */

    return (
      <div>
        <Heading>{title}</Heading>
        <Table
          data={tableData}
          rows={rows}
          columns={columns}
          handleChange={this.handleCellChange}
          onReset={this.handleReset}
          onRemoveRow={this.handleRemoveRow}
          onRemoveColumn={this.handleRemoveColumn}
        />
        <ButtonGrid>
          <Button onClick={this.handleAddRow}>Add row</Button>
          <Button onClick={this.handleAddColumn}>Add column</Button>
          <Button onClick={this.handleClear} color="danger">
            Empty cells
          </Button>
        </ButtonGrid>
      </div>
    );
  }
}

export default Container;
