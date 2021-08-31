import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalServiceService } from '../../Services/Global/global-service.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../Models/User.model'
import { UserdialogComponent } from '../Parts/dialogs/userdialog/userdialog.component'
import { AppConfig } from 'app.config';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  directionUrl: string = '';
  displayedColumns: string[] = ['image', 'username', 'email', 'position', 'createDate', 'operation'];

  constructor(
    private globalService: GlobalServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  dataSource: MatTableDataSource<User>;

  ngOnInit(): void {
    this.getUserData();
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

  userData: User[] = [];
  getUserData() {
    this.globalService.getGlobalGridData('UserInCompnay').subscribe(result => {
      this.userData = result;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    })
  }

  userModalData: any;
  OpenUserModal(id: number) {
    this.globalService.getGlobalModalData('User', id).subscribe(result => {
      this.userModalData = result;
      let dialogRef = this.dialog.open(UserdialogComponent, {
        disableClose: true,
        width: '300px',
        data: this.userModalData
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getUserData();
      });
    }, error => {
      console.log(error);
    })
  }

  ChangeGloabalStatus(type: string, event: boolean, id: number) {
    let status = (type != 'delete') ? (event) ? 1 : 0 : -1;
    this.globalService.changeGlobalStatus('User', status, id).subscribe(result => {
      this.getUserData();
      this.showSnackbar('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }

}
