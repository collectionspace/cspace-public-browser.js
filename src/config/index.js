import loget from 'lodash/get';
import lomerge from 'lodash/mergeWith';
import defaultConfig from './default';
import anthroConfig from './anthro';
import bonsaiConfig from './bonsai';
import botgardenConfig from './botgarden';
import fcartConfig from './fcart';
import herbariumConfig from './herbarium';
import lhmcConfig from './lhmc';
import materialsConfig from './materials';
import publicartConfig from './publicart';

const namedConfig = {
  anthro: anthroConfig,
  bonsai: bonsaiConfig,
  botgarden: botgardenConfig,
  fcart: fcartConfig,
  herbarium: herbariumConfig,
  lhmc: lhmcConfig,
  materials: materialsConfig,
  publicart: publicartConfig,
};

const config = lomerge({}, defaultConfig);

const configMerge = (objValue, srcValue) => {
  // overwrite arrays instead of merging them
  if (Array.isArray(objValue)) {
    return srcValue;
  }

  return undefined;
};

export default {
  get: (path, defaultValue) => loget(config, path, defaultValue),

  // eslint-disable-next-line no-console
  log: () => console.log(config),

  merge: (...sources) => {
    sources.forEach((source) => {
      const {
        baseConfig: baseConfigName,
      } = source;

      if (baseConfigName) {
        const baseConfig = namedConfig[baseConfigName];

        if (baseConfig) {
          lomerge(config, baseConfig, configMerge);
        }
      }

      lomerge(config, source, configMerge);
    });
  },

  getFilterFieldConfig: (id) => loget(config, ['filters', 'fields', id]),
};
