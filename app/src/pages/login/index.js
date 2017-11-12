import angular from 'angular';
import uirouter from 'angular-ui-router';
import LoginController from './login.controller';
import routing from './login.routes';

export default angular.module('login', [ uirouter ])
  .config(routing)
  .controller('LoginController', LoginController)
  .name;