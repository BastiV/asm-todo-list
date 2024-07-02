import { Component } from '@angular/core';
import {NgbNav} from "@ng-bootstrap/ng-bootstrap";
import {TaskListComponent} from "../task-list/task-list.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgbNav,
    TaskListComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent {

}
