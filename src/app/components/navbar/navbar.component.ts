import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getToken, logout } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('login') loginDialog!: TemplateRef<any>;
  @ViewChild('register') registerdialog!: TemplateRef<any>;
  dialogConfig = new MatDialogConfig();
  registered: boolean = false;
  logged: boolean = false;

  constructor(
    public dialog: MatDialog,
    private store: Store<IState>,
    private router: Router
    ) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.panelClass = ["bg-dialog-modal"];
    this.dialogConfig.minWidth = 100;
    this.dialogConfig.minHeight = 100;
    this.dialogConfig.maxWidth = 500;
    this.dialogConfig.maxHeight = 500;
   }

  ngOnInit(): void {
    this.sessionStatus()
  }

  /**
   * @function singIn
   * 
   */
  singIn(){
    this.dialog.open(this.loginDialog, this.dialogConfig);
  }

  singUp(){
    this.dialog.open(this.registerdialog, this.dialogConfig);
  }

  singOut(){
    this.store.dispatch(logout());
    this.store.select('authReducer').subscribe( (res) => {
      this.logged = false;
      this.router.navigate(['/home'])
    })
  }

  sessionStatus(){
    /* this.store.dispatch(getToken()); */
    this.store.select('authReducer').subscribe( (res) => {
        this.logged = res.token != null? true:false
        this.logged = res.auth != null? true: false      
    })
  }

}
