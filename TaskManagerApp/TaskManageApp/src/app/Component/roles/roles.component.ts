import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalServiceService } from '../../Services/Global/global-service.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../../Models/Role.model'
import { RoledialogComponent } from '../Parts/dialogs/roledialog/roledialog.component'
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  displayedColumns: string[] = ['name', 'createDate', 'status', 'operation'];

  constructor(
    private globalService: GlobalServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  dataSource: MatTableDataSource<Role>;

  ngOnInit(): void {
    this.getRolesData();
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

  roleData: Role[] = [];
  getRolesData() {
    this.globalService.getGlobalGridData('UserRoles').subscribe(result => {
      this.roleData = result;
      this.dataSource = new MatTableDataSource(this.roleData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    })
  }

  roleModalData: any;
  OpenRoleModal(id: number) {
    this.globalService.getGlobalModalData('Role', id).subscribe(result => {
      this.roleModalData = result;
      let dialogRef = this.dialog.open(RoledialogComponent, {
        disableClose: true,
        width: '300px',
        data: this.roleModalData
      });

      dialogRef.afterClosed().subscribe(result_ => {
        this.getRolesData();
      });
    }, error => {
      console.log(error);
    })
  }

  ChangeGloabalStatus(type: string, event: boolean, id: number) {
    let status = (type != 'delete') ? (event) ? 1 : 0 : -1;
    this.globalService.changeGlobalStatus('Role', status, id).subscribe(result => {
      this.getRolesData();
      this.showSnackbar('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }
}
