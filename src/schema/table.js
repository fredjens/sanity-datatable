import Table from '../container';

export default {
  title: 'Table',
  name: 'table',
  type: 'object',
  fields: [{
    type: 'array',
    name: 'rows',
    of: [{type: 'column'}]
  }],
  inputComponent: Table,
}
