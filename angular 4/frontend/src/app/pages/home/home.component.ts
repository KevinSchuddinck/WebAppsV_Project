import {Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../../_common/services/users.services';
import { Observable  } from 'rxjs/Rx';
import { Blogpost } from './blogpost';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  title = 'Home';
  blogposts: Blogpost[];
  loaded = false;
  blogpostForm: FormGroup;
  // Lifecycle
  constructor (private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') == null) {
      this.logout();
    } else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.blogpostForm = this.formBuilder.group({
        'text': [null, Validators.compose([ Validators.required ]) ],
        'email': [currentUser.email, Validators.compose([Validators.required])]
      });
      this.getBlogposts();
    }
  }

  ngOnDestroy() {
  }

  sendBlogPost() {
      this.userService.sendBlogpost(this.blogpostForm.value).subscribe((data) => {
        this.getBlogposts();
      }, err => {
        if (err.error.message === 'invalid authToken') {
          this.logout();
        }
       });
  }

  getBlogposts() {
        this.userService.getBlogposts().subscribe((data) => {
        // console.log(data);
        this.blogposts = data.blogposts.slice().reverse();
        this.loaded = true;
      }, err => {
        if (err.error.message === 'invalid authToken') {
          this.logout();
        }
       });
  }

  logout() {
    if (localStorage.getItem('currentUser') != null) {
      localStorage.clear();
    }
    this.router.navigateByUrl('/');
  }

}
