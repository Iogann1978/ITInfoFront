import { Injectable } from '@angular/core';
import {BookItem} from "../model/book-item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private displayedColumns: string[] = ['title', 'isbn', 'publisher', 'pages', 'rate', 'state', 'year', 'actions'];

  constructor(private http: HttpClient) { }

  getBookItems(): Observable<BookItem[]> {
    this.http.get<BookItem[]>('./assets/books.json').subscribe(data => console.log(data));
    return this.http.get<BookItem[]>('./assets/books.json');
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
