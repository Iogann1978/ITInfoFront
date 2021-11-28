import {Component, OnInit, ViewChild} from '@angular/core';
import {BooksService} from "./books.service";
import {BookItem} from "../model/book-item";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService]
})
export class BooksComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<BookItem> = new MatTableDataSource<BookItem>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('booksPaginator') booksPaginator: MatPaginator;

  constructor(
    private booksService: BooksService
  ) {
    this.displayedColumns = this.booksService.getDisplayedColumns();
    this.booksService.getBookItems()
      .subscribe((data:BookItem[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.booksPaginator;
      });
  }

  ngOnInit(): void {
  }
}
