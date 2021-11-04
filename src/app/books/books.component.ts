import {Component, OnInit} from '@angular/core';
import {BooksService} from "./books.service";
import {BookItem} from "../model/book-item";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService]
})
export class BooksComponent implements OnInit {
  displayedColumns: string[];
  dataSource: BookItem[] = [];

  constructor(private bookService: BooksService) {
    this.displayedColumns = this.bookService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.bookService.getBookItems()
      .subscribe((data:BookItem[]) => this.dataSource = data);
  }
}
