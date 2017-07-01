export default class Account {

  constructor ($http) {
    'ngInject';
    this.http = $http;
    this.authToken = '';
    this.errors = [];
  }

  login (email, password) {
    try {
      const result = await this.http({
        url: 'http://127.0.0.1:3000/api/account/login',
        method: 'POST',
        data: { email, password }
      });
      this.authToken = result.authToken;
    } catch (e) {
      console.warn('ERROR', e);
      errors.push(e);
    }
  }

};
