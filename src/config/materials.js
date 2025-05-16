import { defineMessages } from 'react-intl';
import { getItemShortID } from 'cspace-refname';

import {
  displayName,
  filterLink,
  head,
  linkText,
  inlineList,
  listOf,
  inlineListOf,
  nameRole,
  numericRange,
  objectTypeValue,
  paragraphs,
  pickAllFromList,
  pickFromList,
  renderFilterLink,
  renderJoined,
  valueAt,
  valueWithNote,
} from '../helpers/formatHelpers';

const composition = (data) => {
  const parts = [
    'materialCompositionFamilyName',
    'materialCompositionClassName',
    'materialCompositionGenericName',
  ].map((fieldName) => renderFilterLink(fieldName, displayName(data[fieldName])));

  return renderJoined(parts, ' - ');
};

export default {
  messages: {
    'rootPage.title': 'Material Order',
    'searchQueryInput.label': 'Search materials',
    'searchQueryInput.placeholder': 'Search materials',
    'searchResultStats.count': '{count, plural, one {# material} other {# materials}} found',
    'institutionIndex.label': 'Samples at {title}',
  },

  gatewayUrl: 'http://localhost:8180/gateway/materials',
  detailPath: 'material',
  imageLoadDelay: 4000,
  pageLoadDelay: 1500,
  pageAutoLoadLimit: 40,

  defaultQuery: {
    term: {
      'ecm:primaryType': 'Materialitem',
    },
  },

  includeFields: [
    'ecm:name',
    'ecm:primaryType',
    'collectionspace_denorm:holdingInstitutions',
    'collectionspace_denorm:mediaCsid',
    'collectionspace_denorm:title',
    'materials_common:shortIdentifier',
  ],

  referenceField: 'materials_common:shortIdentifier',

  storageKey: 'mo',

  searchResultImageDerivative: 'OriginalJpeg',
  detailImageDerivative: 'OriginalJpeg',

  detailTitle: (data) => {
    const {
      'materials_common:materialTermGroupList': materialTermGroups,
    } = data;

    if (materialTermGroups && materialTermGroups.length > 0) {
      const {
        termDisplayName,
        historicalStatus,
      } = materialTermGroups[0];

      const title = (
        termDisplayName + (historicalStatus === 'historical' ? ' (formerly known as)' : '')
      );

      return title;
    }

    return undefined;
  },

  detailSubtitle: (data) => {
    const {
      'materials_common:materialTermGroupList': materialTermGroups,
    } = data;

    if (materialTermGroups && materialTermGroups.length > 1) {
      const displayNames = materialTermGroups
        .slice(1)
        .map((termGroup) => {
          const {
            termDisplayName,
            historicalStatus,
          } = termGroup;

          return (
            termDisplayName + (historicalStatus === 'historical' ? ' (formerly known as)' : '')
          );
        });

      return renderJoined(displayNames, '\n');
    }

    return undefined;
  },

  detailDescription: (data) => {
    const {
      'materials_common:description': description,
    } = data;

    return description && description.split('\n');
  },

  filters: {
    fields: {
      material: {
        field: 'collectionobjects_common:materialGroupList.material',
      },
      materialTermAttributionContributingOrganization: {
        field: 'collectionspace_denorm:holdingInstitutions.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.materialTermAttributionContributingOrganization.label',
            defaultMessage: 'Institution',
          },
        }),
      },
      materialCompositionFamilyName: {
        field: 'materials_common:materialCompositionGroupList.materialCompositionFamilyName.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.materialCompositionFamilyName.label',
            defaultMessage: 'Family name',
          },
          shortLabel: {
            id: 'filter.materialCompositionFamilyName.shortLabel',
            defaultMessage: 'Family',
          },
        }),
      },
      materialCompositionClassName: {
        field: 'materials_common:materialCompositionGroupList.materialCompositionClassName.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.materialCompositionClassName.label',
            defaultMessage: 'Class name',
          },
          shortLabel: {
            id: 'filter.materialCompositionClassName.shortLabel',
            defaultMessage: 'Class',
          },
        }),
      },
      materialCompositionGenericName: {
        field: 'materials_common:materialCompositionGroupList.materialCompositionGenericName.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.materialCompositionGenericName.label',
            defaultMessage: 'Generic name',
          },
          shortLabel: {
            id: 'filter.materialCompositionGenericName.shortLabel',
            defaultMessage: 'Generic',
          },
        }),
      },
      typicalUses: {
        field: 'materials_common:typicalUses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.typicalUses.label',
            defaultMessage: 'Typical use',
          },
        }),
      },
      commonForm: {
        field: 'materials_common:commonForm.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.commonForm.label',
            defaultMessage: 'Common form',
          },
        }),
      },
      formType: {
        field: 'materials_common:formTypeGroupList.formType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.formType.label',
            defaultMessage: 'Form type',
          },
        }),
      },
      acousticalPropertyType: {
        field: 'materials_common:acousticalPropertyGroupList.acousticalPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.acousticalPropertyType.label',
            defaultMessage: 'Acoustical property',
          },
          shortLabel: {
            id: 'filter.acousticalPropertyType.shortLabel',
            defaultMessage: 'Acoustical',
          },
        }),
      },
      durabilityPropertyType: {
        field: 'materials_common:durabilityPropertyGroupList.durabilityPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.durabilityPropertyType.label',
            defaultMessage: 'Durability property',
          },
          shortLabel: {
            id: 'filter.durabilityPropertyType.shortLabel',
            defaultMessage: 'Durability',
          },
        }),
      },
      electricalPropertyType: {
        field: 'materials_common:electricalPropertyGroupList.electricalPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.electricalPropertyType.label',
            defaultMessage: 'Electrical property',
          },
          shortLabel: {
            id: 'filter.electricalPropertyType.shortLabel',
            defaultMessage: 'Electrical',
          },
        }),
      },
      hygrothermalPropertyType: {
        field: 'materials_common:hygrothermalPropertyGroupList.hygrothermalPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.hygrothermalPropertyType.label',
            defaultMessage: 'Hygrothermal property',
          },
          shortLabel: {
            id: 'filter.hygrothermalPropertyType.shortLabel',
            defaultMessage: 'Hygrothermal',
          },
        }),
      },
      mechanicalPropertyType: {
        field: 'materials_common:mechanicalPropertyGroupList.mechanicalPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.mechanicalPropertyType.label',
            defaultMessage: 'Mechanical property',
          },
          shortLabel: {
            id: 'filter.mechanicalPropertyType.shortLabel',
            defaultMessage: 'Mechanical',
          },
        }),
      },
      opticalPropertyType: {
        field: 'materials_common:opticalPropertyGroupList.opticalPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.opticalPropertyType.label',
            defaultMessage: 'Optical property',
          },
          shortLabel: {
            id: 'filter.opticalPropertyType.shortLabel',
            defaultMessage: 'Optical',
          },
        }),
      },
      sensorialPropertyType: {
        field: 'materials_common:sensorialPropertyGroupList.sensorialPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.sensorialPropertyType.label',
            defaultMessage: 'Sensorial property',
          },
          shortLabel: {
            id: 'filter.sensorialPropertyType.shortLabel',
            defaultMessage: 'Sensorial',
          },
        }),
      },
      smartMaterialPropertyType: {
        field: 'materials_common:smartMaterialPropertyGroupList.smartMaterialPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.smartMaterialPropertyType.label',
            defaultMessage: 'Smart material property',
          },
          shortLabel: {
            id: 'filter.smartMaterialPropertyType.shortLabel',
            defaultMessage: 'Smart material',
          },
        }),
      },
      additionalPropertyType: {
        field: 'materials_common:additionalPropertyGroupList.additionalPropertyType.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.additionalPropertyType.label',
            defaultMessage: 'Additional property',
          },
        }),
      },
      recycledContentQualifier: {
        field: 'materials_common:recycledContentGroupList.recycledContentQualifier.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.recycledContentQualifier.label',
            defaultMessage: 'Recycled content',
          },
          shortLabel: {
            id: 'filter.recycledContentQualifier.shortLabel',
            defaultMessage: 'Recycled',
          },
        }),
      },
      lifecycleComponent: {
        field: 'materials_common:lifecycleComponentGroupList.lifecycleComponent.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.lifecycleComponent.label',
            defaultMessage: 'Lifecycle component',
          },
          shortLabel: {
            id: 'filter.lifecycleComponent.shortLabel',
            defaultMessage: 'Lifecycle',
          },
        }),
      },
      certificationProgram: {
        field: 'materials_common:certificationCreditGroupList.certificationProgram.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.certificationProgram.label',
            defaultMessage: 'Certification program',
          },
          shortLabel: {
            id: 'filter.certificationProgram.shortLabel',
            defaultMessage: 'Certification',
          },
        }),
      },
      castingProcesses: {
        field: 'materials_common:castingProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.castingProcesses.label',
            defaultMessage: 'Casting process',
          },
          shortLabel: {
            id: 'filter.castingProcesses.shortLabel',
            defaultMessage: 'Casting',
          },
        }),
      },
      deformingProcesses: {
        field: 'materials_common:deformingProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.deformingProcesses.label',
            defaultMessage: 'Deforming process',
          },
          shortLabel: {
            id: 'filter.deformingProcesses.shortLabel',
            defaultMessage: 'Deforming',
          },
        }),
      },
      joiningProcesses: {
        field: 'materials_common:joiningProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.joiningProcesses.label',
            defaultMessage: 'Joining process',
          },
          shortLabel: {
            id: 'filter.joiningProcesses.shortLabel',
            defaultMessage: 'Joining',
          },
        }),
      },
      machiningProcesses: {
        field: 'materials_common:machiningProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.machiningProcesses.label',
            defaultMessage: 'Machining process',
          },
          shortLabel: {
            id: 'filter.machiningProcesses.shortLabel',
            defaultMessage: 'Machining',
          },
        }),
      },
      moldingProcesses: {
        field: 'materials_common:moldingProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.moldingProcesses.label',
            defaultMessage: 'Molding process',
          },
          shortLabel: {
            id: 'filter.moldingProcesses.shortLabel',
            defaultMessage: 'Molding',
          },
        }),
      },
      rapidPrototypingProcesses: {
        field: 'materials_common:rapidPrototypingProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.rapidPrototypingProcesses.label',
            defaultMessage: 'Rapid prototyping process',
          },
          shortLabel: {
            id: 'filter.rapidPrototypingProcesses.shortLabel',
            defaultMessage: 'Rapid prototyping',
          },
        }),
      },
      surfacingProcesses: {
        field: 'materials_common:surfacingProcesses.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.surfacingProcesses.label',
            defaultMessage: 'Surfacing process',
          },
          shortLabel: {
            id: 'filter.surfacingProcesses.shortLabel',
            defaultMessage: 'Surfacing',
          },
        }),
      },
      additionalProcess: {
        field: 'materials_common:additionalProcessGroupList.additionalProcess.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.additionalProcess.label',
            defaultMessage: 'Additional process',
          },
        }),
      },
      featuredApplication: {
        field: 'materials_common:featuredApplicationGroupList.featuredApplication.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.featuredApplication.label',
            defaultMessage: 'Featured application',
          },
        }),
      },
      featuredCollection: {
        field: 'materials_common:featuredCollectionGroupList.featuredCollection.displayName',
        messages: defineMessages({
          label: {
            id: 'filter.featuredCollection.label',
            defaultMessage: 'Featured collection',
          },
        }),
      },
    },
    groups: {
      group_institution: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_institution.label',
            defaultMessage: 'Holding Institution',
          },
        }),
        fields: [
          'materialTermAttributionContributingOrganization',
        ],
      },
      group_composition: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_composition.label',
            defaultMessage: 'Composition',
          },
        }),
        fields: [
          'materialCompositionFamilyName',
          'materialCompositionClassName',
          'materialCompositionGenericName',
        ],
      },
      group_use: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_use.label',
            defaultMessage: 'Use',
          },
        }),
        fields: [
          'typicalUses',
        ],
      },
      group_form: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_form.label',
            defaultMessage: 'Form',
          },
        }),
        fields: [
          'commonForm',
          'formType',
        ],
      },
      group_properties: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_properties.label',
            defaultMessage: 'Properties',
          },
        }),
        fields: [
          'acousticalPropertyType',
          'durabilityPropertyType',
          'electricalPropertyType',
          'hygrothermalPropertyType',
          'mechanicalPropertyType',
          'opticalPropertyType',
          'sensorialPropertyType',
          'smartMaterialPropertyType',
          'additionalPropertyType',
        ],
      },
      group_ecology: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_ecology.label',
            defaultMessage: 'Material Ecology',
          },
        }),
        fields: [
          'recycledContentQualifier',
          'lifecycleComponent',
          'certificationProgram',
        ],
      },
      group_processing: {
        messages: defineMessages({
          label: {
            id: 'filterGroup.group_processing.label',
            defaultMessage: 'Processing',
          },
        }),
        fields: [
          'castingProcesses',
          'deformingProcesses',
          'joiningProcesses',
          'machiningProcesses',
          'moldingProcesses',
          'rapidPrototypingProcesses',
          'surfacingProcesses',
          'additionalProcess',
        ],
      },
    },
    layout: {
      filters1: [
        'group_institution',
        'group_composition',
        'group_use',
        'group_form',
        'group_properties',
        'group_ecology',
        'group_processing',
      ],
    },
  },

  detailFields: {
    fields: {
      material: {
        field: 'collectionobjects_common:materialGroupList',
      },
      featuredCollectionGroupList: {
        field: 'materials_common:featuredCollectionGroupList',
        format: listOf((valueAt({
          path: 'featuredCollection',
          format: filterLink({
            filterValueFormat: displayName,
          }),
        }))),
      },
      materialCompositionGroupList: {
        field: 'materials_common:materialCompositionGroupList',
        format: listOf(composition),
      },
      typicalUses: {
        field: 'materials_common:typicalUses',
        format: inlineListOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      featuredApplicationGroupList: {
        field: 'materials_common:featuredApplicationGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'featuredApplication',
          noteFieldName: 'featuredApplicationNote',
        })),
      },
      materialProductionOrganizationGroupList: {
        label: 'Company',
        field: 'materials_common:materialProductionOrganizationGroupList',
        format: listOf(nameRole({
          nameFieldName: 'materialProductionOrganization',
          roleFieldName: 'materialProductionOrganizationRole',
          linkName: false,
        })),
      },
      materialProductionPersonGroupList: {
        label: 'Person',
        field: 'materials_common:materialProductionPersonGroupList',
        format: listOf(nameRole({
          nameFieldName: 'materialProductionPerson',
          roleFieldName: 'materialProductionPersonRole',
          linkName: false,
        })),
      },
      materialProductionPlaceGroupList: {
        label: 'Place',
        field: 'materials_common:materialProductionPlaceGroupList',
        format: listOf(nameRole({
          nameFieldName: 'materialProductionPlace',
          roleFieldName: 'materialProductionPlaceRole',
          linkName: false,
        })),
      },
      productionDate: {
        label: 'Date',
        field: 'materials_common:productionDate',
        format: valueAt({ path: 'dateDisplayDate' }),
      },
      discontinued: {
        label: 'Discontinued',
        field: 'materials_common:discontinued',
      },
      productionNote: {
        label: 'Production Note',
        field: 'materials_common:productionNote',
      },
      externalUrlGroupList: {
        field: 'materials_common:externalUrlGroupList',
        format: listOf(linkText({
          urlFieldName: 'externalUrl',
          textFieldName: 'externalUrlNote',
          type: 'external',
        })),
      },
      additionalResourceGroupList: {
        field: 'materials_common:additionalResourceGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'additionalResource',
          noteFieldName: 'additionalResourceNote',
        })),
      },
      commonForm: {
        label: 'Common form',
        field: 'materials_common:commonForm',
        format: filterLink({
          filterValueFormat: displayName,
        }),
      },
      formTypeGroupList: {
        label: 'Form type',
        field: 'materials_common:formTypeGroupList',
        format: inlineListOf(valueAt({
          path: 'formType',
          format: filterLink({
            filterValueFormat: displayName,
          }),
        })),
      },
      acousticalPropertyGroupList: {
        label: 'Acoustical',
        field: 'materials_common:acousticalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'acousticalPropertyType',
          noteFieldName: 'acousticalPropertyNote',
        })),
      },
      durabilityPropertyGroupList: {
        label: 'Durability',
        field: 'materials_common:durabilityPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'durabilityPropertyType',
          noteFieldName: 'durabilityPropertyNote',
        })),
      },
      electricalPropertyGroupList: {
        label: 'Electrical',
        field: 'materials_common:electricalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'electricalPropertyType',
          noteFieldName: 'electricalPropertyNote',
        })),
      },
      hygrothermalPropertyGroupList: {
        label: 'Hygro-thermal',
        field: 'materials_common:hygrothermalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'hygrothermalPropertyType',
          noteFieldName: 'hygrothermalPropertyNote',
        })),
      },
      mechanicalPropertyGroupList: {
        label: 'Mechanical',
        field: 'materials_common:mechanicalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'mechanicalPropertyType',
          noteFieldName: 'mechanicalPropertyNote',
        })),
      },
      opticalPropertyGroupList: {
        label: 'Optical',
        field: 'materials_common:opticalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'opticalPropertyType',
          noteFieldName: 'opticalPropertyNote',
        })),
      },
      sensorialPropertyGroupList: {
        label: 'Sensorial',
        field: 'materials_common:sensorialPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'sensorialPropertyType',
          noteFieldName: 'sensorialPropertyNote',
        })),
      },
      smartMaterialPropertyGroupList: {
        label: 'Smart material',
        field: 'materials_common:smartMaterialPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'smartMaterialPropertyType',
          noteFieldName: 'smartMaterialPropertyNote',
        })),
      },
      additionalPropertyGroupList: {
        label: 'Additional',
        field: 'materials_common:additionalPropertyGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'additionalPropertyType',
          noteFieldName: 'additionalPropertyNote',
        })),
      },
      propertyNote: {
        label: 'Property note',
        field: 'materials_common:propertyNote',
      },
      recycledContentGroupList: {
        label: 'Recycled content',
        field: 'materials_common:recycledContentGroupList',
        format: listOf(numericRange({
          lowFieldName: 'recycledContent',
          highFieldName: 'recycledContentHigh',
          unit: '%',
          qualifierFieldName: 'recycledContentQualifier',
          linkQualifier: true,
        })),
      },
      lifecycleComponentGroupList: {
        label: 'Lifecycle component',
        field: 'materials_common:lifecycleComponentGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'lifecycleComponent',
          noteFieldName: 'lifecycleComponentNote',
          noteLabel: '',
          separator: ' - ',
        })),
      },
      embodiedEnergyGroupList: {
        label: 'Embodied energy',
        field: 'materials_common:embodiedEnergyGroupList',
        format: listOf(numericRange({
          lowFieldName: 'embodiedEnergyValue',
          highFieldName: 'embodiedEnergyValueHigh',
          unitFieldName: 'embodiedEnergyUnit',
          qualifierFieldName: 'embodiedEnergyNote',
          qualifierSeparator: ' - ',
        })),
      },
      certificationCreditGroupList: {
        label: 'Certification credit',
        field: 'materials_common:certificationCreditGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'certificationProgram',
          noteFieldName: 'certificationCreditNote',
          noteLabel: '',
          separator: ' - ',
        })),
      },
      ecologyNote: {
        label: 'Material ecology note',
        field: 'materials_common:ecologyNote',
      },
      castingProcesses: {
        label: 'Casting',
        field: 'materials_common:castingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      joiningProcesses: {
        label: 'Joining',
        field: 'materials_common:joiningProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      moldingProcesses: {
        label: 'Molding',
        field: 'materials_common:moldingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      surfacingProcesses: {
        label: 'Surfacing',
        field: 'materials_common:surfacingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      deformingProcesses: {
        label: 'Deforming',
        field: 'materials_common:deformingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      machiningProcesses: {
        label: 'Machining',
        field: 'materials_common:machiningProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      rapidPrototypingProcesses: {
        label: 'Rapid prototyping',
        field: 'materials_common:rapidPrototypingProcesses',
        format: listOf(filterLink({
          filterValueFormat: displayName,
        })),
      },
      additionalProcessGroupList: {
        label: 'Additional process',
        field: 'materials_common:additionalProcessGroupList',
        format: listOf(valueWithNote({
          valueFieldName: 'additionalProcess',
          noteFieldName: 'additionalProcessNote',
        })),
      },
      processNote: {
        label: 'Process note',
        field: 'materials_common:processNote',
      },
    },
    groups: {
      group_featured_collection: {
        label: 'Featured collection',
        fields: [
          'featuredCollectionGroupList',
        ],
      },
      group_composition: {
        label: 'Composition',
        fields: [
          'materialCompositionGroupList',
        ],
      },
      group_use: {
        label: 'Typical use',
        fields: [
          'typicalUses',
        ],
      },
      group_application: {
        label: 'Featured application',
        fields: [
          'featuredApplicationGroupList',
        ],
      },
      group_production: {
        label: 'Production',
        fields: [
          'materialProductionOrganizationGroupList',
          'materialProductionPersonGroupList',
          'materialProductionPlaceGroupList',
          'productionDate',
          'discontinued',
          'productionNote',
        ],
      },
      group_link: {
        label: 'External links',
        fields: [
          'externalUrlGroupList',
        ],
      },
      group_standard: {
        label: 'External standard',
        fields: [
          'additionalResourceGroupList',
        ],
      },
      group_form: {
        label: 'Form',
        fields: [
          'commonForm',
          'formTypeGroupList',
        ],
      },
      group_property: {
        label: 'Properties',
        fields: [
          'acousticalPropertyGroupList',
          'durabilityPropertyGroupList',
          'electricalPropertyGroupList',
          'hygrothermalPropertyGroupList',
          'mechanicalPropertyGroupList',
          'opticalPropertyGroupList',
          'sensorialPropertyGroupList',
          'smartMaterialPropertyGroupList',
          'additionalPropertyGroupList',
          'propertyNote',
        ],
      },
      group_ecology: {
        label: 'Material ecology',
        fields: [
          'recycledContentGroupList',
          'lifecycleComponentGroupList',
          'embodiedEnergyGroupList',
          'certificationCreditGroupList',
          'ecologyNote',
        ],
      },
      group_process: {
        label: 'Processes',
        fields: [
          'castingProcesses',
          'joiningProcesses',
          'moldingProcesses',
          'surfacingProcesses',
          'deformingProcesses',
          'machiningProcesses',
          'rapidPrototypingProcesses',
          'additionalProcessGroupList',
          'processNote',
        ],
      },
    },
    layout: {
      fields1: [
        'group_featured_collection',
        'group_composition',
        'group_use',
        'group_application',
        'group_production',
        'group_link',
        'group_standard',
        'group_form',
        'group_property',
      ],
      fields2: [
        'group_ecology',
        'group_process',
      ],
    },
  },

  institutionHoldings: {
    query: (data) => {
      const {
        'collectionspace_core:refName': refName,
      } = data;

      const shortId = getItemShortID(refName);

      return {
        term: {
          'collectionobjects_common:materialGroupList.material.shortid': shortId,
        },
      };
    },
    sortField: 'collectionobjects_common:objectNumber',
    title: {
      name: 'collectionobjects_common:otherNumberList',
      format: pickFromList({
        condition: {
          path: 'numberType',
          value: 'callnumber',
        },
        format: valueAt({ path: 'numberValue' }),
      }),
    },
    detailFields: {
      fields: {
        otherNumberList: {
          label: 'Call number',
          field: 'collectionobjects_common:otherNumberList',
          format: pickAllFromList({
            condition: {
              path: 'numberType',
              value: 'callnumber',
            },
            format: valueAt({ path: 'numberValue' }),
          }),
          className: 'title',
        },
        collection: {
          label: 'Collection',
          field: 'collectionobjects_common:collection',
          format: displayName,
        },
        namedCollection: {
          label: 'Named collection',
          field: 'collectionobjects_common:namedCollections',
          format: listOf(displayName),
        },
        computedCurrentLocation: {
          label: 'Current location',
          field: 'collectionobjects_common:computedCurrentLocation',
          format: displayName,
        },
        materialPhysicalDescriptions: {
          label: 'Physical description',
          field: 'collectionobjects_materials:materialPhysicalDescriptions',
          format: paragraphs,
        },
        materialContainerGroupList: {
          label: 'Container',
          field: 'collectionobjects_materials:materialContainerGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'container',
            noteFieldName: 'containerNote',
            linkValue: false,
          })),
        },
        materialConditionGroupList: {
          label: 'Condition',
          field: 'collectionobjects_materials:materialConditionGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'condition',
            noteFieldName: 'conditionNote',
            linkValue: false,
          })),
        },
        materialHandlingGroupList: {
          label: 'Handling',
          field: 'collectionobjects_materials:materialHandlingGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'handling',
            noteFieldName: 'handlingNote',
            linkValue: false,
          })),
        },
        colors: {
          label: 'Color',
          field: 'collectionobjects_common:colors',
          format: inlineList,
        },
        materialGenericColors: {
          label: 'Generic color',
          field: 'collectionobjects_materials:materialGenericColors',
          format: inlineListOf(displayName),
        },
        materialFinishGroupList: {
          label: 'Finish',
          field: 'collectionobjects_materials:materialFinishGroupList',
          format: listOf(valueWithNote({
            valueFieldName: 'finish',
            noteFieldName: 'finishNote',
            linkValue: false,
          })),
        },
        objectCount: {
          label: 'Holdings',
          field: 'collectionobjects_common:objectCountGroupList',
          format: head(valueAt({ path: 'objectCount' })),
        },
        objectStatusList: {
          label: 'Type',
          field: 'collectionobjects_common:objectStatusList',
          format: inlineListOf(objectTypeValue),
        },
        briefDescriptions: {
          label: 'Production description',
          field: 'collectionobjects_common:briefDescriptions',
          format: paragraphs,
        },
        measuredPartGroupList: {
          label: 'Size',
          field: 'collectionobjects_common:measuredPartGroupList',
          format: listOf(
            valueAt({ path: 'dimensionSummary' }),
          ),
        },
        objectNumber: {
          label: 'System number',
          field: 'collectionobjects_common:objectNumber',
        },
      },
      groups: {
        group_sample_otherNumberList: {
          fields: [
            'otherNumberList',
          ],
        },
        group_sample_collection: {
          fields: [
            'collection',
          ],
        },
        group_sample_namedCollection: {
          fields: [
            'namedCollection',
          ],
        },
        group_sample_computedCurrentLocation: {
          fields: [
            'computedCurrentLocation',
          ],
        },
        group_sample_materialPhysicalDescriptions: {
          fields: [
            'materialPhysicalDescriptions',
          ],
        },
        group_sample_condition: {
          fields: [
            'materialContainerGroupList',
            'materialConditionGroupList',
            'materialHandlingGroupList',
          ],
        },
        group_sample_description: {
          fields: [
            'colors',
            'materialGenericColors',
            'materialFinishGroupList',
          ],
        },
        group_sample_holdings: {
          fields: [
            'objectCount',
            'objectStatusList',
          ],
          className: 'inline',
        },
        group_sample_briefDescriptions: {
          fields: [
            'briefDescriptions',
          ],
        },
        group_sample_measuredPartGroupList: {
          fields: [
            'measuredPartGroupList',
          ],
        },
        group_sample_system: {
          fields: [
            'objectNumber',
          ],
        },
      },
      layout: {
        fields1: [
          'group_sample_otherNumberList',
          'group_sample_collection',
          'group_sample_namedCollection',
          'group_sample_computedCurrentLocation',
          'group_sample_materialPhysicalDescriptions',
          'group_sample_condition',
          'group_sample_description',
          'group_sample_holdings',
          'group_sample_briefDescriptions',
          'group_sample_measuredPartGroupList',
          'group_sample_system',
          'group_reference',
        ],
      },
    },
  },
};
