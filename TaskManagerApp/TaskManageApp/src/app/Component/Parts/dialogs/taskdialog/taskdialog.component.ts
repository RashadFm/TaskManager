import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { TaskServiceService } from '../../../../Services/Task/task-service.service'
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-taskdialog',
  templateUrl: './taskdialog.component.html',
  styleUrls: ['./taskdialog.component.css']
})
export class TaskdialogComponent implements OnInit {
  modalData: any;

  constructor(
    public dialogRef: MatDialogRef<TaskdialogComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalData = data;
    dialogRef.disableClose = true;
  }

  taskForm: FormGroup;
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: this.modalData.id,
      name: [this.modalData.name, Validators.required],
      deadLine: [this.modalData.deadLine],
      desc: [this.modalData.desc],
      status: [this.modalData.status, Validators.required],
      uids: [(this.modalData.uids) ? this.modalData.uids.split(',').map(x => +x) : '']
    });
  }

  showSnackbarCssStyles(content, action, duration) {
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

  today: string = new Date().toJSON().split('T')[0];

  taskOperation() {
    let assigner = this.taskForm.get('uids').value.toString();
    this.taskForm.patchValue({ uids: assigner });
    this.taskService.taskOperation(this.taskForm.value).subscribe(resul => {
      this.showSnackbarCssStyles('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }
}
