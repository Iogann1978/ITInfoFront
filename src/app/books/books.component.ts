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

  constructor(private booksService: BooksService) {
    this.displayedColumns = this.booksService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.booksService.getBookItems()
      .subscribe((data:BookItem[]) => this.dataSource = data);
  }
}
