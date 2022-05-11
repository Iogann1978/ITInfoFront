import {Component, OnInit, ViewChild} from '@angular/core';
import {BooksService} from "./books.service";
import {BookItem} from "../model/book-item";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

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
    private booksService: BooksService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = this.booksService.getDisplayedColumns();
    this.refreshData();
  }

  delete(bookId: number) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.booksService.deleteBook(bookId).subscribe(response => this.refreshData());
      }
    });
  }

  ngOnInit(): void {
  }

  refreshData() {
    this.booksService.getBookItems().subscribe((data:BookItem[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.booksPaginator;
    });
  }
}
