import { Component, OnInit } from '@angular/core';
import {AuthorsService} from "./authors.service";
import {Author} from "../model/author";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [AuthorsService]
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Author[];

  constructor(private authorsService: AuthorsService) {
    this.dataSource = authorsService.getAuthors();
    this.displayedColumns = authorsService.getDisplayedColumns();
  }

  ngOnInit(): void {
  }
}
