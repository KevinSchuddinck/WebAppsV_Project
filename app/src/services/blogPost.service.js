export default class BlogPost {

  constructor ($http) {
    'ngInject';
    this.http = $http;
  }

  async fetchAllBlogPosts () {
    const result = await this.http({
      //url: 'http://127.0.0.1:3000/api/account/login',
      method: 'GET'
    });
    return result;
  }

};
