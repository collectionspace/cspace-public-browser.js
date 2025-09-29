# Configuration Reference

Configuration settings can be supplied to override the [default configuration](../../src/config/default.js).

## `basename`
Required.

The path to the web page containing the public browser, as seen in the URL to the page (which typically would also be the path to the index.html file, from the web root directory). For example, if the public browser is being added to a web page located at http://mymuseum.org/cspace/collection/index.html, then `basename` should be set to `/cspace/collection`.

## `gatewayUrl`
Required.

The URL of a CollectionSpace public gateway that has access to the collection data. Typically, this is something like `https://{cspace server hostname}/gateway/{tenant short name}`. This can vary depending on how the CollectionSpace back-end has been configured, so verify the gateway URL with your CollectionSpace administrator.


## `baseConfig`
The name of a configuration set to apply over the default configuration. Can be one of the following: `'anthro'`, `'bonsai'`, `'botgarden'`, `'fcart'`, `'herbarium'` `'lhmc'`, `'materials'`, `'publicart'`. These configurations adjust the public browser for use with CollectionSpace community-of-practice profiles.

To view the contents of a named configuration set, refer to the corresponding .js file in the [config](../../src/config/) directory.

## `filterOrder`
Default: `{ _term: 'asc' }`

The sort order of filter values appearing in the "Refine results" sidebar. This can be set to `{ _term: 'asc' }` to sort alphabetically, or to `{ _count: 'desc' }` to sort by the number of search results containing the value (highest to lowest).

This setting can be [overridden on a per-filter basis](#order).

## `filterSize`
Default: `300`

The maximum number of values to show for each filter in the "Refine results" sidebar. Increasing this shows more values, but makes searches slower.

This setting can be [overridden on a per-filter basis](#size).

## `filters`
Contains configuration for filter fields and groups.

### `fields`
Contains configuration for filter fields, keyed by field name. For example, to configure the `objectProductionPerson` filter field:

```
filters: {
  fields: {
    objectProductionPerson: {
      order: { _count: 'desc' },
    },
  },
},
```

To find the names of filter fields that can be configured, refer to the [default configuration](../../src/config/default.js), and any configuration set that has been applied using the [`baseConfig`](#baseConfig) setting.

Filter field configuration can contain the following settings:

#### `order`
Overrides the top-level [`filterOrder`](#filterOrder) setting, for this field.

#### `size`
Overrides the top-level [`filterSize`](#filterSize) setting, for this field.

### `mediaSnapshotSort`
Contains configuration for sorting images in object details view. The options are: `'identificationNumber'`, `'title'`, `'updatedAt'`.

Default:
```
mediaSnapshotSort: {
    title: 'asc',
},
```
