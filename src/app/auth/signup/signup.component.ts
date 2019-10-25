import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubs = this.uiService.loadingState.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  onSignup(form: NgForm) {
    this.authService.registeredUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
