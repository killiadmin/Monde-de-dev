import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  isAsc = false;

  toggleSort() {
    this.isAsc = !this.isAsc;
  }

  goToDetails(): void {
    this.router.navigate(['/articles/details/1']);
  }
}
