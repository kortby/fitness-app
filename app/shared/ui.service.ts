import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
  constructor(private snackbar: MatSnackBar) {}
  loadingState = new Subject<boolean>();

  showSnackbar(message, action, durationArg) {
    this.snackbar.open(message, action, {
      duration: durationArg
    });
  }
}
