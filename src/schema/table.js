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
  preview: {
    select: {
      rows: 'rows',
    },
    prepare ({ rows }) {
      const rowLength = rows.length || 0
      const colLength = rowLength ? rows[0].cells.length : 0

      if (rowLength === 0) {
        return {
          title: 'Empty table',
          subtitle: ''
        }
      }
      const headings = rows[0].cells

      return {
        title: headings.join(' | '),
        subtitle: `${colLength} cols x ${rowLength} rows`,
      }
    }
  }
}
