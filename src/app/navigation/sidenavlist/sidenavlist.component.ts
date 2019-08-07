import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenavlist',
  templateUrl: './sidenavlist.component.html',
  styleUrls: ['./sidenavlist.component.scss']
})
export class SidenavlistComponent implements OnInit {

  @Output() whenClose = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.whenClose.emit();
  }

}
