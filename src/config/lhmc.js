export default {
  gatewayUrl: 'http://localhost:8180/gateway/lhmc',

  filters: {
    fields: {
      objectProductionPlace: {
        field: 'collectionobjects_common:objectProductionPlaceGroupList.objectProductionPlace.displayName',
      },
    },
  },
};
