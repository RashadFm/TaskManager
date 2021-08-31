import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthServiceService } from '../../../../Services/Auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private formBuilder: FormBuilder,
    private authservice: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }
  companyForm: FormGroup;

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      phone: [''],
      address: [''],
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
      ])),
    });
  }
  
  emailValidationOpe: number = 0;
  checkEmail(email: any) {
    let userInfo = {
      email: email,
    }
    this.authservice.checkEmail(userInfo).subscribe(result => {
      this.emailValidationOpe = (result == 1) ? 1 : 0;
    }, error => {
      console.log(error);
    })
  }

  NewOrganizationOperation() {
    if (this.companyForm.invalid) {
      return;
    }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/Home/Task';
    this.authservice.NewOrganizationOperation(this.companyForm.value).subscribe(result => {
      if (result.islogin == 1) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userinfo', JSON.stringify(result.userinfo));
        this.router.navigate([returnUrl]);
      }
    }, error => {
      console.log(error);
    })
  }
}
