export default class LoginController {

  constructor (accountService, $location, $scope) {
    'ngInject';
    this.name = 'World';
    this.errorMessage = '';
    this.accountService = accountService;
    this.location = $location;
    this.scope = $scope;
  }

  onClickRegister () {
    this.location.path('/home');
  }

  async onSubmit (login) {
    try {
      this.errorMessage = '';
      await this.accountService.login(login.email, login.password);
    } catch (e) {
      this.errorMessage = e.message;
      console.warn('ERROOOOOOOOOOOR: ' +this.errorMessage);
    }
    this.location.path('/home');
    this.scope.$apply();
  }

}
