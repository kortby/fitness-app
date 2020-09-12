import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
        this.trainingService.cancelfireSubscription();
      }
    });
  }

  registeredUser(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        this.uiService.loadingState.next(false);
      })
      .catch(error => {
        this.uiService.loadingState.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
        // this.snackBar.open(error, null, {
        //   duration: 3000
        // });
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        this.uiService.loadingState.next(false);
      })
      .catch(error => {
        this.uiService.loadingState.next(false);

        this.uiService.showSnackbar(error.message, null, 3000);
        // this.snackBar.open(error, null, {
        //   duration: 3000
        // });
      });
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
