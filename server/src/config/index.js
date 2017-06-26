import development from './development.js';

let config = development;

//doesn't get into if statement, which is weird
console.warn(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  config = development;
}

export default config;
