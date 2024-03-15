import local from './local.config';
import dev from './dev.config';
import prod from './prod.config';

const env = process.env.NODE_ENV || 'dev';

const configurations = {
  dev,
  local,
  prod,
};

const config = configurations[env];

export default () => config();
