import { defineMessages } from 'react-intl';
import { getIntl } from '../intl';

import {
  boolean,
  decade,
  displayName,
  filterLink,
  list,
  listOf,
  nameRole,
  valueAt,
} from '../helpers/formatHelpers';

const departmentMessages = defineMessages({
  antiquities: {
    id: 'option.departments.antiquities',
    defaultMessage: 'Antiquities',
  },
  'architecture-design': {
    id: 'option.departments.architecture-design',
    defaultMessage: 'Architecture and Design',
  },
  'decorative-arts': {
    id: 'option.departments.decorative-arts',
    defaultMessage: 'Decorative Arts',
  },
  ethnography: {
    id: 'option.departments.ethnography',
    defaultMessage: 'Ethnography',
  },
  herpetology: {
    id: 'option.departments.herpetology',
    defaultMessage: 'Herpetology',
  },
  'media-performance-art': {
    id: 'option.departments.media-performance-art',
    defaultMessage: 'Media and Performance Art',
  },
  'paintings-sculpture': {
    id: 'option.departments.paintings-sculpture',
    defaultMessage: 'Paintings and Sculpture',
  },
  paleobotany: {
    id: 'option.departments.paleobotany',
    defaultMessage: 'Paleobotany',
  },
  photographs: {
    id: 'option.departments.photographs',
    defaultMessage: 'Photographs',
  },
  'prints-drawings': {
    id: 'option.departments.prints-drawings',
    defaultMessage: 'Prints and Drawings',
  },
});

const formatDepartment = (data) => {
  const message = departmentMessages[data];

  return message ? getIntl().formatMessage(message) : data;
};

export default {
  basename: '',
  container: '#cspace-browser',
  gatewayUrl: 'http://localhost:8180/gateway/core',
  locale: 'en-US',
  detailPath: 'detail',

  defaultQuery: {
    term: {
      'ecm:primaryType': 'CollectionObject',
    },
  },

  fulltextSearchFields: [
    'all_field',
  ],

  includeFields: [
    'ecm:name',
    'ecm:primaryType',
    'collectionspace_denorm:mediaCsid',
    'collectionspace_denorm:title',
    'collectionspace_denorm:mediaAltText',
  ],

  referenceField: 'ecm:name',

  defaultSortOrder: 'bestmatch',
  sortField: 'collectionspace_denorm:title',
  storageKey: 'cspace-browser',

  searchResultImageDerivative: 'Small',
  detailImageDerivative: 'Medium',

  tileTitle: {
    field: 'collectionspace_denorm:title',
    formatValue: displayName,
  },

  filters: {
    fields: {
      objectName: {
        field: 'collectionobjects_common:objectNameList.objectName',
        messages: defineMessages({
          label: {
            id: 'filter.objectName.label',
            defaultMessage: 'Name',
          },
          shortLabel: {
            id: 'filter.objectName.shortLabel',
            defaultMessage: 'Name',
          },
        }),
      },
      objectProductionPerson: {
        field: 'collectionobjects_common:objectProductionPersonGroupList.objectProductionPerson.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.objectProductionPerson.label',
            defaultMessage: 'Production person',
          },
          shortLabel: {
            id: 'filter.objectProductionPerson.shortLabel',
            defaultMessage: 'Prod. person',
          },
        }),
      },
      objectProductionOrganization: {
        field: 'collectionobjects_common:objectProductionOrganizationGroupList.objectProductionOrganization.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.objectProductionOrganization.label',
            defaultMessage: 'Production organization',
          },
          shortLabel: {
            id: 'filter.objectProductionOrganization.shortLabel',
            defaultMessage: 'Prod. organization',
          },
        }),
      },
      objectProductionPeople: {
        field: 'collectionobjects_common:objectProductionPeopleGroupList.objectProductionPeople',
        messages: defineMessages({
          label: {
            id: 'filter.objectProductionPeople.label',
            defaultMessage: 'Production people/culture',
          },
          shortLabel: {
            id: 'filter.objectProductionPeople.shortLabel',
            defaultMessage: 'Prod. people/culture',
          },
        }),
      },
      prodYears: {
        field: 'collectionspace_denorm:prodYears',
        type: 'histogram',
        interval: 10,
        formatValue: decade,
        messages: defineMessages({
          label: {
            id: 'filter.prodYears.label',
            defaultMessage: 'Production date',
          },
          shortLabel: {
            id: 'filter.prodYears.shortLabel',
            defaultMessage: 'Prod. date',
          },
        }),
      },
      objectProductionPlace: {
        field: 'collectionobjects_common:objectProductionPlaceGroupList.objectProductionPlace',
        messages: defineMessages({
          label: {
            id: 'filter.objectProductionPlace.label',
            defaultMessage: 'Production place',
          },
          shortLabel: {
            id: 'filter.objectProductionPlace.shortLabel',
            defaultMessage: 'Prod. place',
          },
        }),
      },
      material: {
        field: 'collectionobjects_common:materialGroupList.material',
        messages: defineMessages({
          label: {
            id: 'filter.material.label',
            defaultMessage: 'Material',
          },
          shortLabel: {
            id: 'filter.material.shortLabel',
            defaultMessage: 'Material',
          },
        }),
      },
      color: {
        field: 'collectionobjects_common:colors',
        messages: defineMessages({
          label: {
            id: 'filter.color.label',
            defaultMessage: 'Color',
          },
          shortLabel: {
            id: 'filter.color.shortLabel',
            defaultMessage: 'Color',
          },
        }),
      },
      responsibleDepartment: {
        field: 'collectionobjects_common:responsibleDepartments',
        formatValue: formatDepartment,
        messages: defineMessages({
          label: {
            id: 'filter.responsibleDepartment.label',
            defaultMessage: 'Department',
          },
          shortLabel: {
            id: 'filter.responsibleDepartment.shortLabel',
            defaultMessage: 'Dept',
          },
        }),
      },
      contentConcept: {
        field: 'collectionobjects_common:contentConcepts.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.contentConcept.label',
            defaultMessage: 'Subject',
          },
          shortLabel: {
            id: 'filter.contentConcept.shortLabel',
            defaultMessage: 'Subject',
          },
        }),
      },
      technique: {
        field: 'collectionobjects_common:techniqueGroupList.technique',
        messages: defineMessages({
          label: {
            id: 'filter.technique.label',
            defaultMessage: 'Technique',
          },
          shortLabel: {
            id: 'filter.technique.shortLabel',
            defaultMessage: 'Technique',
          },
        }),
      },
      hasMedia: {
        field: 'collectionspace_denorm:hasMedia',
        formatValue: boolean,
        showSearch: false,
        messages: defineMessages({
          label: {
            id: 'filter.hasMedia.label',
            defaultMessage: 'Has image',
          },
          shortLabel: {
            id: 'filter.hasMedia.shortLabel',
            defaultMessage: 'Has image',
          },
        }),
      },
    },
    groups: {
      group_id: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_id.label',
            defaultMessage: 'Identification',
          },
        }),
        fields: [
          'responsibleDepartment',
          'objectName',
        ],
      },
      group_media: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_media.label',
            defaultMessage: 'Media',
          },
        }),
        fields: [
          'hasMedia',
        ],
      },
      group_description: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_description.label',
            defaultMessage: 'Description',
          },
        }),
        fields: [
          'material',
          'contentConcept',
          'color',
        ],
      },
      group_production: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_production.label',
            defaultMessage: 'Production',
          },
        }),
        fields: [
          'technique',
          'objectProductionPerson',
          'objectProductionOrganization',
          'objectProductionPeople',
          'objectProductionPlace',
          'prodYears',
        ],
      },
    },
    layout: {
      filters1: [
        'group_id',
        'group_media',
        'group_description',
        'group_production',
      ],
    },
  },

  detailTitle: (data) => {
    const {
      'collectionobjects_common:titleGroupList': titleGroups,
    } = data;

    if (titleGroups && titleGroups.length > 0) {
      const {
        title,
      } = titleGroups[0];

      return title;
    }

    return undefined;
  },

  detailSubtitle: (data) => {
    const {
      'collectionobjects_common:objectNameList': objectNameGroups,
    } = data;

    if (objectNameGroups && objectNameGroups.length > 0) {
      const {
        objectName,
      } = objectNameGroups[0];

      return objectName;
    }

    return undefined;
  },

  detailDescription: (data) => {
    const {
      'collectionobjects_common:briefDescriptions': briefDescriptions,
    } = data;

    if (briefDescriptions && briefDescriptions.length > 0) {
      return briefDescriptions[0];
    }

    return undefined;
  },

  detailFields: {
    fields: {
      objectNumber: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectNumber.label',
            defaultMessage: 'Number',
          },
        }),
        field: 'collectionobjects_common:objectNumber',
      },
      responsibleDepartment: {
        messages: defineMessages({
          label: {
            id: 'detailField.responsibleDepartment.label',
            defaultMessage: 'Department',
          },
        }),
        field: 'collectionobjects_common:responsibleDepartments',
        format: listOf(filterLink({ linkTextFormat: formatDepartment })),
      },
      objectProductionPerson: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectProductionPerson.label',
            defaultMessage: 'Person',
          },
        }),
        field: 'collectionobjects_common:objectProductionPersonGroupList',
        format: listOf(nameRole({
          nameFieldName: 'objectProductionPerson',
          roleFieldName: 'objectProductionPersonRole',
        })),
      },
      objectProductionOrganization: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectProductionOrganization.label',
            defaultMessage: 'Organization',
          },
        }),
        field: 'collectionobjects_common:objectProductionOrganizationGroupList',
        format: listOf(nameRole({
          nameFieldName: 'objectProductionOrganization',
          roleFieldName: 'objectProductionOrganizationRole',
        })),
      },
      objectProductionPeople: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectProductionPeople.label',
            defaultMessage: 'People/culture',
          },
        }),
        field: 'collectionobjects_common:objectProductionPeopleGroupList',
        format: listOf(nameRole({
          nameFieldName: 'objectProductionPeople',
          roleFieldName: 'objectProductionPeopleRole',
        })),
      },
      objectProductionPlace: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectProductionPlace.label',
            defaultMessage: 'Place',
          },
        }),
        field: 'collectionobjects_common:objectProductionPlaceGroupList',
        format: listOf(nameRole({
          nameFieldName: 'objectProductionPlace',
          roleFieldName: 'objectProductionPlaceRole',
        })),
      },
      objectProductionDate: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectProductionDate.label',
            defaultMessage: 'Date',
          },
        }),
        field: 'collectionobjects_common:objectProductionDateGroupList',
        format: listOf(valueAt({ path: 'dateDisplayDate' })),
      },
      material: {
        messages: defineMessages({
          label: {
            id: 'detailField.material.label',
            defaultMessage: 'Material',
          },
        }),
        field: 'collectionobjects_common:materialGroupList',
        format: listOf(valueAt({
          path: 'material',
          format: filterLink({}),
        })),
      },
      technique: {
        messages: defineMessages({
          label: {
            id: 'detailField.technique.label',
            defaultMessage: 'Technique',
          },
        }),
        field: 'collectionobjects_common:techniqueGroupList',
        format: listOf(nameRole({
          nameFieldName: 'technique',
          roleFieldName: 'techniqueType',
        })),
      },
      contentConcept: {
        messages: defineMessages({
          label: {
            id: 'detailField.contentConcept.label',
            defaultMessage: 'Subject',
          },
        }),
        field: 'collectionobjects_common:contentConcepts',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      measuredPart: {
        messages: defineMessages({
          label: {
            id: 'detailField.measuredPart.label',
            defaultMessage: 'Dimensions',
          },
        }),
        field: 'collectionobjects_common:measuredPartGroupList',
        format: listOf(nameRole({
          nameFieldName: 'dimensionSummary',
          roleFieldName: 'measuredPart',
          linkName: false,
        })),
      },
      creditLine: {
        messages: defineMessages({
          label: {
            id: 'detailField.creditLine.label',
            defaultMessage: 'Credit',
          },
        }),
        field: 'collectionspace_denorm:creditLine',
        format: list,
      },
    },
    groups: {
      group_id: {
        messages: defineMessages({
          label: {
            id: 'detailGroup.group_id.label',
            defaultMessage: 'Identification',
          },
        }),
        fields: [
          'objectNumber',
          'responsibleDepartment',
        ],
      },
      group_description: {
        messages: defineMessages({
          label: {
            id: 'detailGroup.group_description.label',
            defaultMessage: 'Description',
          },
        }),
        fields: [
          'material',
          'technique',
          'contentConcept',
          'measuredPart',
          'creditLine',
        ],
      },
      group_production: {
        messages: defineMessages({
          label: {
            id: 'detailGroup.group_production.label',
            defaultMessage: 'Production',
          },
        }),
        fields: [
          'objectProductionPerson',
          'objectProductionOrganization',
          'objectProductionPeople',
          'objectProductionPlace',
          'objectProductionDate',
        ],
      },
    },
    layout: {
      fields1: [
        'group_id',
        'group_description',
        'group_production',
      ],
    },
  },
};
