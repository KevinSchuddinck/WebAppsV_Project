import angular from 'angular';
import Account from './account.service.js';
import BlogPost from './blogPost.service';

export default angular.module('services', [])
  .service('accountService', Account)
  .service('blogPostService', BlogPost)
  .name;
