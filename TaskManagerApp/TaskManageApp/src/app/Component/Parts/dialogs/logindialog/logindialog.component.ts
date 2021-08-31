import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthServiceService } from '../../../../Services/Auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    private formBuilder: FormBuilder,
    private authservice: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }
  
  userForm: FormGroup;

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
      ])),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  errorMessage: string;
  LogIn(){
    if (this.userForm.invalid) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/Home/Task';

    this.authservice.Login(this.userForm.value).subscribe(result => {
        if (result.islogin == 1) {
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('userinfo', JSON.stringify(result.userinfo));
          this.router.navigate([returnUrl]);
          this.dialogRef.close();
      }
      else {
        this.errorMessage = result.error;
        this.userForm.setErrors({
          invalidLogin: true
        });
      }
 
    }, error => {
      console.log(error);
    })
  }
}
