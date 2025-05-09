import config from '../../../src/config';

chai.should();

describe('config', () => {
  it('should have default properties', () => {
    const filters = config.get('filters');
    const detailFields = config.get('detailFields');

    filters.should.have.property('fields');
    filters.should.have.property('groups');
    filters.should.have.property('layout');

    detailFields.should.have.property('fields');
    detailFields.should.have.property('groups');
    detailFields.should.have.property('layout');
  });

  it('should overwrite arrays during merge', () => {
    const customConfig = {
      filters: {
        groups: {
          group_production: {
            fields: ['technique'],
          },
        },
      },
    };

    config.get(['filters', 'groups', 'group_production']).should.be.an('object');

    // First check the default config has an array with size > 1
    const {
      fields: defaultFields,
    } = config.get(['filters', 'groups', 'group_production']);

    defaultFields.should.not.have.lengthOf(1);

    // Then update and check our array only contains 'technique'
    config.merge(customConfig);
    const {
      fields: updatedFields,
    } = config.get(['filters', 'groups', 'group_production']);

    updatedFields.should.have.length(1);
    updatedFields.should.include('technique');
  });
});
