import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-sidenavlist",
  templateUrl: "./sidenavlist.component.html",
  styleUrls: ["./sidenavlist.component.scss"]
})
export class SidenavlistComponent implements OnInit {
  @Output() whenClose = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onClose() {
    this.whenClose.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
