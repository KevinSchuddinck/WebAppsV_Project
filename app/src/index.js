import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './config/app.config';
import login from './pages/login';

// http://beta.angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/
const app = angular.module('app', [
  uirouter,
  login
]).config(routing);
