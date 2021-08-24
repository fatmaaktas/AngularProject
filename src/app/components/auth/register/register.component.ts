import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/db/common.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  ngForm: any;
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
      password: ['', Validators.required],
      address: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    })
  }
  onToggleMode() {
    this.router.navigateByUrl('auth')
  }

  onSubmit(form: any) {
    if (form.invalid)
      return;
      this.authService.signIn(this.form.value.email, this.form.value.password).then((result: any) => {
        this.commonSvc.setData(`users`, `${result.uid}`,
          {
            email: this.form.value.email,
            name: this.form.value.name,
            phone: this.form.value.phone,
            address: this.form.value.address
          })
      })
    
  }
}

