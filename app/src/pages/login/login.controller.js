export default class LoginController {

  constructor (accountService, $location) {
    'ngInject';
    this.name = 'World';
    this.errorMessage = '';
    this.accountService = accountService;
    this.location = $location;
  }

  onClickRegister () {
    this.location.path('/home');
  }

  async onSubmit (login) {
    try {
      this.errorMessage = '';
      await this.accountService.login(login.email, login.password);
      // location.path('/home');
    } catch (e) {
      this.errorMessage = e.data.message;
      console.warn(this.errorMessage);
    }

  }

}
