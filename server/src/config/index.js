import development from './development.js';

let config;


//doesn't get into if statement, which is weird
console.warn(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  config = development;
}

//solved problem by setting the config to development without the if statement
config = development;

export default config;
