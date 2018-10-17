# Sanity Datatable

This is a plugin for the awesome [Sanity CMS](http://sanity.io)

Which adds support for datatables.

![Datatable](https://user-images.githubusercontent.com/4348783/47113644-df97f400-d259-11e8-982c-b0a8b158be77.png)

Install:

```js
npm i sanity-datatable
```

To use the datatable, we need this __schema:__
```js
{
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
```