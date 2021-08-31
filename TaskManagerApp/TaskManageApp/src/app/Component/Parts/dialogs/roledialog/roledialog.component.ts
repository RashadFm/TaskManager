import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/User/user-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-roledialog',
  templateUrl: './roledialog.component.html',
  styleUrls: ['./roledialog.component.css']
})
export class RoledialogComponent implements OnInit {

  modalData: any;
  constructor(
    public dialogRef: MatDialogRef<RoledialogComponent>,
    private formBuilder: FormBuilder,
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

  roleForm: FormGroup;
  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      id: this.modalData.id,
      name: [this.modalData.name, Validators.required],
    });
  }

  roleOperation() {
    if (this.roleForm.invalid) {
      return;
    }

    this.userService.roleOperation(this.roleForm.value).subscribe(result => {
      this.showSnackbar('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }
}
