import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles_list.component.html',
  styleUrls: ['./articles_list.component.scss']
})
export class Articles_listComponent implements OnInit {

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
