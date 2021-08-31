import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../Parts/dialogs/signup/signup.component';
import { LogindialogComponent } from '../Parts/dialogs/logindialog/logindialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modalSignUp(): void {
    this.dialog.open(SignupComponent, {
      disableClose: true,
      width: '600px',
      data: {
        name: '', phone: '',
        address: '', username: '',
        email: '', password: ''
      }
    });
  }

  modalLogIn(): void {
    this.dialog.open(LogindialogComponent, {
      disableClose: true,
      width: '300px',
      data: { email: '', password: '' }
    });
  }
}
