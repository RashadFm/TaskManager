import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthServiceService } from '../../../../Services/Auth/auth-service.service';
import { UserServiceService } from 'src/app/Services/User/user-service.service'; 

@Component({
  selector: 'app-accountdialog',
  templateUrl: './accountdialog.component.html',
  styleUrls: ['./accountdialog.component.css']
})
export class AccountdialogComponent implements OnInit {

  modalData:any;
  constructor(
    public dialogRef: MatDialogRef<AccountdialogComponent>,
    private formBuilder: FormBuilder,
    private authservice: AuthServiceService,
    private userServiceService:UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     this.modalData=data;
    dialogRef.disableClose = true;
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

  accountForm:FormGroup;
  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      id:this.modalData[0].id,
      username: [this.modalData[0].username, Validators.required],
      email: new FormControl(this.modalData[0].email, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl(this.modalData[0].password, Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
      ])),
    });
  }
  
  ChangeUserAccount() {
    if (this.accountForm.invalid) {
      return;
    }

    this.userServiceService.ChangeUserAccount(this.accountForm.value).subscribe(result => {
      this.authservice.LogOut();
    }, error => {
      console.log(error);
    })
  }
}
