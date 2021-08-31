import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/Auth/auth-service.service';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-userdialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css']
})

export class UserdialogComponent implements OnInit {

  modalData: any;
  constructor(
    public dialogRef: MatDialogRef<UserdialogComponent>,
    private formBuilder: FormBuilder,
    private authservice: AuthServiceService,
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalData = data;
    dialogRef.disableClose = true;
  }

  showSnackbar(content, action, duration) {
    let sb = this.snackBar.open(content, '', {
      duration: duration,
      panelClass: ["btn-success"],
      verticalPosition: "bottom",
      horizontalPosition: "right"
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
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

  userForm: FormGroup;
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id:this.modalData.id,
      username: [this.modalData.username, Validators.required],
      email: new FormControl(this.modalData.email, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      position: new FormControl(this.modalData.position, Validators.required),
    });
  }

  userOperation() {
    if (this.userForm.invalid) {
      return;
    }
   
    this.userService.userOperation(this.userForm.value).subscribe(result => {
      this.showSnackbar('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }
}
