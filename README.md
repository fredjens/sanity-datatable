# Sanity Datatable

This is a plugin for the awesome [Sanity CMS](http://sanity.io)

Which adds support for datatables.

![datatable](https://user-images.githubusercontent.com/4348783/47114004-e3784600-d25a-11e8-96c9-b11b66c1c388.gif)

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