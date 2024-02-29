import { defineMessages } from 'react-intl';

export default {
  gatewayUrl: 'http://localhost:8180/gateway/fcart',

  filters: {
    fields: {
      objectProductionPlace: {
        field: 'collectionobjects_common:objectProductionPlaceGroupList.objectProductionPlace.displayName',
      },
    },
  },
  detailFields: {
    fields: {
      materialTechniqueDescription: {
        messages: defineMessages({
          label: {
            id: 'detailField.materialTechniqueDescription.label',
            defaultMessage: 'Medium',
          },
        }),
        field: 'collectionobjects_fineart:materialTechniqueDescription',
      },
    },
    groups: {
      group_description: {
        fields: [
          'materialTechniqueDescription',
          'material',
          'technique',
          'subject',
          'contentDescription',
          'measuredPart',
          'creditLine',
        ],
      },
    },
  },
};
