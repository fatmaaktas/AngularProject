import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { CommonService } from 'src/app/db/common.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

  form: any;
  users: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private commonSvc: CommonService,
    public fb: FormBuilder) {
    this.initForm()
  }

  ngOnInit(): void {

  }
  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    })
  }
  onToggleMode() {
    this.router.navigateByUrl('auth/register')
  }

  onSubmit(form: any) {

    if (form.invalid)
      return;
      this.authService.login(this.form.value.email, this.form.value.password).then(() => {
        this.router.navigateByUrl('addTutorial')
      }, err => {
        console.log(err);
      }).then(() => {
        this.form.reset();
      })
    
    
  }


}
function email(email: any, password: any) {
  throw new Error('Function not implemented.');
}

function password(email: (email: any, password: any) => void, password: any) {
  throw new Error('Function not implemented.');
}

