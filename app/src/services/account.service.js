export default class Account {

  constructor ($http, $window) {
    'ngInject';
    this.http = $http;
    this.window = $window;
  }

  async login (email, password) {
    const result = await this.http({
      url: 'http://127.0.0.1:3000/api/account/login',
      method: 'POST',
      data: {
        email : email,
        password : password },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }
    });
    this.window.sessionStorage['authToken'] = result.data.authToken;
  }

};
