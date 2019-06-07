export default {
  title: 'Table column',
  name: 'column',
  type: 'object',
  fields: [{
    type: 'array',
    name: 'cells',
    of: [{ type: 'string'}]
  }]
}
