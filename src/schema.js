import Table from './container';

export default {
  title: 'Table',
  name: 'table',
  type: 'object',
  fields: [{
    type: 'array',
    name: 'rows',
    of: [{
      type: 'object',
      name: 'column',
      fields: [{
        type: 'array',
        name: 'cells',
        of: [{ type: 'string'}]
      }]
    }]
  }],
  inputComponent: Table,
}
