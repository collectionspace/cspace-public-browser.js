export default {
  gatewayUrl: 'http://localhost:8180/gateway/lhmc',

  filters: {
    fields: {
      objectProductionPlace: {
        field: 'collectionobjects_common:objectProductionPlaceGroupList.objectProductionPlace.displayName',
      },
    },
  },
  detailFields: {
    layout: {
      fields1: [
        'group_production',
        'group_id',
        'group_description',
        'group_rights',
        'group_reference',
      ],
    },
  },
};
