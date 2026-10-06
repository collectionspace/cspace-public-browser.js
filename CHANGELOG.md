## v4.0.1

- Fix detail page images not displaying in the materials profile. Add the `mediaSource`
configuration setting, which controls whether images are found by searching for related media
records (`'media'`, the default) or by reading the media csids denormalized onto the record
(`'record'`, used by the materials base configuration).
- Fix crash on material detail pages with institution holdings, caused by an undefined
`group_reference` group in the institution holdings layout of the materials base configuration.

## v4.0.0

Version 4.0.0 requires CollectionSpace 9.0 with ElasticSearch 7 support, and works with
ElasticSearch 7.17.x and OpenSearch 1. Compatibility with ElasticSearch 5 has been dropped
(ES 5 reached end of life in 2019).

- Add ElasticSearch 7 support
- Display images in the order given by the record's media priority list
(`collectionspace_denorm:mediaPriorityList`), when available. The first priority image 
is used as the search result thumbnail, and the detail page gallery shows priority images 
without making a separate media query.
- Change configurable image ordering default to title ascending, matching Staff UI.

## v3.5.1
- Fix configurable image ordering (default: updated at descending)

## v3.5.0
- Add configurable image ordering (default: title ascending)
- Fix exhibition layout issue
- Improve filter sidebar UX
- Fix paragraph padding
- Add `materialTechniqueDescription` field in anthro
- Add configurable department labels

## v3.3.0

- Display all brief descriptions when available
- Add display for published related links
- Add link on featuredCollection

## v3.2.0

## v3.1.0

- Clicking an image on the detail page opens it in a new tab.

## v3.0.0

Version 3.0.0 requires CollectionSpace 8.0.

- Replace `contentConcept` with `subject` (combines values from `contentConcepts`, `contentEvents`, `contentPersons`, and `contentOrganizations`).
- In materials configuration, replace `numberOfObjects` with  `objectCount` (first value only).

## v2.1.1

- Fix object production place appearing as a URN in LHMC configuration.

## v2.1.0

- Filter order and size are now configurable.

## v2.0.0

Version 2.0.0 requires CollectionSpace 8.0. It is intended for Lyrasis use only. Please use v3.0.0 instead.

- Replace `collectionobjects_common:objectNameList.objectName` with `collectionspace_denorm:objectNameList.objectName` (combines values from `objectName` and `objectNameControlled`).
- Replace `collectionspace_denorm:materialGroupList.material` with `collectionspace_denorm:materialGroupList.material` (combines values from `material` and `materialControlled`).
- Add object name to detail page.

## v1.x

Version 1 of the public browser requires CollectionSpace 7.2.
