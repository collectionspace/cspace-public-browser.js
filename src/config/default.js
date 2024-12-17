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

  // Time in milliseconds to wait before fetching a search result image. If the search result is
  // scrolled offscreen before the time elapses, the image is not loaded until the result is
  // scrolled into view again. This applies only to pages of results after the first. Images for
  // the first page are fetched immediately.
  imageLoadDelay: 2000,

  // Time in milliseconds to wait before fetching another page of search results, when the result
  // list is scrolled to the bottom.
  pageLoadDelay: 1000,

  // The maximum number of results to automatically load while scrolling. Once this number of
  // results has been retrieved, the user must click a button to load more results.
  pageAutoLoadLimit: 80,

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

  filterOrder: { _term: 'asc' },
  filterSize: 300,

  filters: {
    fields: {
      objectName: {
        field: 'collectionspace_denorm:objectNameList.objectName',
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
        field: 'collectionspace_denorm:materialGroupList.material',
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
      exhibitionTitle: {
        field: 'collectionspace_denorm:exhibition.title',
        messages: defineMessages({
          label: {
            id: 'filter.exhibitionTitle.label',
            defaultMessage: 'Exhibition title',
          },
          shortLabel: {
            id: 'filter.exhibitionTitle.shortLabel',
            defaultMessage: 'Exhibition title',
          },
        }),
      },
      subject: {
        field: 'collectionspace_denorm:contentSubjectList.subject',
        messages: defineMessages({
          label: {
            id: 'filter.subject.label',
            defaultMessage: 'Subject',
          },
          shortLabel: {
            id: 'filter.subject.shortLabel',
            defaultMessage: 'Subject',
          },
        }),
        order: {
          _count: 'desc',
        },
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
          'exhibitionTitle',
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
          'subject',
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
      'collectionspace_denorm:objectNameList': objectNameGroups,
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
      return briefDescriptions;
    }

    return [];
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
      objectName: {
        messages: defineMessages({
          label: {
            id: 'detailField.objectName.label',
            defaultMessage: 'Name',
          },
        }),
        field: 'collectionspace_denorm:objectNameList',
        format: listOf(valueAt({
          path: 'objectName',
          format: filterLink({}),
        })),
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
        field: 'collectionspace_denorm:materialGroupList',
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
      subject: {
        messages: defineMessages({
          label: {
            id: 'detailField.subject.label',
            defaultMessage: 'Subject',
          },
        }),
        field: 'collectionspace_denorm:contentSubjectList',
        format: listOf(valueAt({
          path: 'subject',
          format: filterLink({}),
        })),
      },
      contentDescription: {
        messages: defineMessages({
          label: {
            id: 'detailField.contentDescription.label',
            defaultMessage: 'Content Description',
          },
        }),
        field: 'collectionobjects_common:contentDescription',
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
      rightStatement: {
        messages: defineMessages({
          label: {
            id: 'detailField.rightStatement.label',
            defaultMessage: 'Right Statement',
          },
        }),
        field: 'collectionobjects_common:rightsGroupList',
        format: listOf(valueAt({
          path: 'rightStatement',
        })),
      },
      standardizedRightStatement: {
        messages: defineMessages({
          label: {
            id: 'detailField.standardizedRightStatement.label',
            defaultMessage: 'Standardized Right Statement',
          },
        }),
        field: 'collectionobjects_common:rightsGroupList',
        format: listOf(valueAt({
          path: 'standardizedRightStatement',
          format: displayName,
        })),
      },
      rightReproductionStatement: {
        messages: defineMessages({
          label: {
            id: 'detailField.rightReproductionStatement.label',
            defaultMessage: 'Right Reproduction Statement',
          },
        }),
        field: 'collectionobjects_common:rightsInGroupList',
        format: listOf(valueAt({
          path: 'rightReproductionStatement',
        })),
      },
      relatedLinks: {
        messages: defineMessages({
          label: {
            id: 'detailField.relatedLinks.label',
            defaultMessage: 'Related Links',
          },
        }),
        field: 'collectionobjects_common:publishedRelatedLinkGroupList',
        format: listOf(nameRole({
          nameFieldName: 'relatedLink',
          roleFieldName: 'descriptiveTitle',
        })),
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
          'objectName',
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
          'subject',
          'contentDescription',
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
      group_rights: {
        messages: defineMessages({
          label: {
            id: 'detailGroup.group_rights.label',
            defaultMessage: 'Rights',
          },
        }),
        fields: [
          'rightStatement',
          'standardizedRightStatement',
          'rightReproductionStatement',
        ],
      },
      group_reference: {
        messages: defineMessages({
          label: {
            id: 'detailGroup.group_reference.label',
            defaultMessage: 'Reference',
          },
        }),
        fields: [
          'relatedLinks',
        ],
      },
    },
    layout: {
      fields1: [
        'group_id',
        'group_description',
        'group_production',
        'group_rights',
        'group_reference',
      ],
    },
  },
};
