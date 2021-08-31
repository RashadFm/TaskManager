import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../Models/Tasks.model'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TaskdialogComponent } from '../../Component/Parts/dialogs/taskdialog/taskdialog.component'
import { GlobalServiceService } from '../../Services/Global/global-service.service'
import { AppConfig } from 'app.config';
import { MatSnackBar } from "@angular/material/snack-bar";
  
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  displayedColumns: string[] = ['name', 'effort', 'assigners', 'desc', 'tstatus', 'operation'];
  dataSource: MatTableDataSource<Task>;

  constructor(
    private globalService: GlobalServiceService,
    private dialog: MatDialog,
    private snackBar:MatSnackBar
  ) { }
  
  directionUrl:string='';
  ngOnInit(): void {
    this.getTaskData();
    this.directionUrl = AppConfig.settings.baseUrl;
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

  taskData: Task[];
  getTaskData() {
    this.globalService.getGlobalGridData('Task').subscribe(result => {
      this.taskData = result;
      this.dataSource = new MatTableDataSource(this.taskData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    })
  }

  taskModalData: any;
  OpenTaskModal(id: number) {
    this.globalService.getGlobalModalData('Task', id).subscribe(result => {
      this.taskModalData = result;
      let dialogRef = this.dialog.open(TaskdialogComponent, {
        disableClose: true,
        width: '600px',
        data: this.taskModalData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getTaskData();
        }
      });
    }, error => {
      console.log(error);
    })
  }

  ChangeGloabalStatus(type: string, event: boolean, id: number) {
    let status = (type != 'delete') ? (event) ? 1 : 0 : -1;
    console.log(status);
    this.globalService.changeGlobalStatus('Task', status, id).subscribe(result => {
      this.getTaskData();
      this.showSnackbar('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }
}
