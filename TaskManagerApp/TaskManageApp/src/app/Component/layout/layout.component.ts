import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { AuthServiceService } from '../../Services/Auth/auth-service.service'
import { UserServiceService } from '../../Services/User/user-service.service'
import { User } from '../../Models/User.model'
import { AccountdialogComponent } from '../Parts/dialogs/accountdialog/accountdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalServiceService } from '../../Services/Global/global-service.service'
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppConfig } from 'app.config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @ViewChild('uploadImage') uploadImage: ElementRef<HTMLElement>;
  directionUrl:string='';
  constructor(
    private observer: BreakpointObserver,
    private authService: AuthServiceService,
    private userService: UserServiceService,
    private globalService: GlobalServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.directionUrl = AppConfig.settings.baseUrl;
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
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

  userData: User[] = [];
  getUserData() {
    this.globalService.getGlobalGridData('UserDashboard').subscribe(result => {
      this.userData = result;
    }, error => {
      console.log(error);
    })
  }

  uploadUserImage() {
    let el: HTMLElement = this.uploadImage.nativeElement;
    el.click();
  }

  file: string = '';
  userImage: string = '';
  coverImage: any = {};
  fileToUpload: File = null;
  uploadCoverImg(files: FileList) {
    if (files) {
      this.fileToUpload = files.item(0);
    }
    if (this.fileToUpload.type.includes("image/")) {
      const formData: FormData = new FormData();
      formData.append('type', this.fileToUpload.type);
      formData.append('collection', files.item(0), files.item(0).name);
      this.userService.uploadCoverImg(formData).subscribe(result => {
        this.userImage = result[0].url;
        this.coverImage.image = this.userImage;
        this.coverImage.id = this.userData[0].id;
        this.saveImage(this.coverImage);
      }, error => {
        console.log(error);
      })
    }
  }

  saveImage(obj) {
    this.userService.saveCoverImg(obj).subscribe(result => {
      this.userData = result;
      this.showSnackbarCssStyles('Operation done successfully!!!', '', '2000')
    }, error => {
      console.log(error);
    })
  }

  ChangeUserData() {
    this.dialog.open(AccountdialogComponent, {
      disableClose: true,
      width: '300px',
      data: this.userData
    });
  }

  LogOut() {
    this.authService.LogOut();
  }
}
