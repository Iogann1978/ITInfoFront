import {Component, OnInit} from '@angular/core';
import {BooksService} from "./books.service";
import {BookItem} from "../model/book-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService]
})
export class BooksComponent implements OnInit {
  displayedColumns: string[];
  dataSource: BookItem[] = [];

  constructor(
    private booksService: BooksService,
    private router: Router
  ) {
    this.displayedColumns = this.booksService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.booksService.getBookItems()
      .subscribe((data:BookItem[]) => this.dataSource = data);
  }

  btnClick(id: number) {
    this.router.navigate(['/book/', id]);
  }
}
