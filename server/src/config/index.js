import development from './development';

let config;

if (process.env.NODE_ENV === 'development') {
  config = development;
}

export default config;
