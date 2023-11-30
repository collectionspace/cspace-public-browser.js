import { defineMessages } from 'react-intl';

import {
  valueAt,
} from '../helpers/formatHelpers';

export default {
  gatewayUrl: 'http://localhost:8180/gateway/bonsai',
  messages: {
    'filter.objectProductionPerson.label': 'Original artist',
    'filter.objectProductionPerson.shortLabel': 'Original artist',
    'detailField.objectProductionPerson.label': 'Original artist',
  },
  filters: {
    fields: {
      objectProductionPlace: {
        field: 'collectionobjects_common:objectProductionPlaceGroupList.objectProductionPlace.displayName',
      },
    },
  },
  detailFields: {
    fields: {
      originDate: {
        messages: defineMessages({
          label: {
            id: 'detailField.originDate.label',
            defaultMessage: 'Date of origin',
          },
        }),
        field: 'collectionobjects_common:objectProductionDateGroupList',
        format: valueAt({ path: [0, 'dateDisplayDate'] }),
      },
      trainingDate: {
        messages: defineMessages({
          label: {
            id: 'detailField.trainingDate.label',
            defaultMessage: 'In training since',
          },
        }),
        field: 'collectionobjects_common:objectProductionDateGroupList',
        format: valueAt({ path: [1, 'dateDisplayDate'] }),
      },
    },
    groups: {
      group_production: {
        fields: [
          'objectProductionPerson',
          'objectProductionOrganization',
          'objectProductionPeople',
          'objectProductionPlace',
          'originDate',
          'trainingDate',
        ],
      },
    },
  },
};
