import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidenavlist",
  templateUrl: "./sidenavlist.component.html",
  styleUrls: ["./sidenavlist.component.scss"]
})
export class SidenavlistComponent implements OnInit {
  @Output() whenClose = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  onClose() {
    this.whenClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}
