import { defineMessages } from 'react-intl';

import {
  decade,
  displayName,
  filterLink,
  listOf,
  valueAt,
} from '../helpers/formatHelpers';

export default {
  gatewayUrl: 'http://localhost:8180/gateway/anthro',

  filters: {
    fields: {
      objectProductionPeople: {
        field: 'collectionobjects_common:objectProductionPeopleGroupList.objectProductionPeople.displayName',
      },
      objectProductionPlace: {
        field: 'collectionobjects_common:objectProductionPlaceGroupList.objectProductionPlace.displayName',
      },
      taxon: {
        field: 'collectionobjects_naturalhistory_extension:taxonomicIdentGroupList.taxon.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.taxon.label',
            defaultMessage: 'Taxon name',
          },
          shortLabel: {
            id: 'filter.taxon.shortLabel',
            defaultMessage: 'Taxon',
          },
        }),
      },
      collectionYears: {
        field: 'collectionspace_denorm:collectionYears',
        type: 'histogram',
        interval: 10,
        formatValue: decade,
        messages: defineMessages({
          label: {
            id: 'filter.collectionYears.label',
            defaultMessage: 'Collection date',
          },
          shortLabel: {
            id: 'filter.collectionYears.shortLabel',
            defaultMessage: 'Coll. date',
          },
        }),
      },
    },
    groups: {
      group_collection: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_collection.label',
            defaultMessage: 'Collection',
          },
        }),
        fields: [
          'collectionYears',
        ],
      },
      group_description: {
        fields: [
          'material',
          'technique',
          'subject',
          'color',
          'taxon',
        ],
      },
    },
    layout: {
      filters1: [
        'group_id',
        'group_media',
        'group_collection',
        'group_description',
        'group_production',
      ],
    },
  },

  detailFields: {
    fields: {
      taxon: {
        messages: defineMessages({
          label: {
            id: 'detailField.taxon.label',
            defaultMessage: 'Taxon name',
          },
        }),
        field: 'collectionobjects_naturalhistory_extension:taxonomicIdentGroupList',
        format: listOf(valueAt({
          path: 'taxon',
          format: filterLink({
            filterValueFormat: displayName,
          }),
        })),
      },
      fieldCollectionDate: {
        messages: defineMessages({
          label: {
            id: 'detailField.fieldCollectionDate.label',
            defaultMessage: 'Date',
          },
        }),
        field: 'collectionobjects_common:fieldCollectionDateGroup',
        format: valueAt({ path: 'dateDisplayDate' }),
      },
      fieldCollector: {
        messages: defineMessages({
          label: {
            id: 'detailField.fieldCollector.label',
            defaultMessage: 'Collector',
          },
        }),
        field: 'collectionobjects_common:fieldCollectors',
        format: listOf(displayName),
      },
    },
    groups: {
      group_collection: {
        messages: defineMessages({
          label: {
            id: 'detailGroup.group_collection.label',
            defaultMessage: 'Collection',
          },
        }),
        fields: [
          'fieldCollectionDate',
          'fieldCollector',
        ],
      },
      group_description: {
        fields: [
          'material',
          'technique',
          'subject',
          'color',
          'contentDescription',
          'measuredPart',
          'creditLine',
          'taxon',
        ],
      },
    },
    layout: {
      fields1: [
        'group_id',
        'group_collection',
        'group_description',
        'group_production',
        'group_reference',
      ],
    },
  },
};
