import { Injectable } from '@angular/core';
import {BookItem} from "../model/book-item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiBookEndpoint: string = '';

  private displayedColumns: string[] = ['title', 'isbn', 'publisher', 'pages', 'rate', 'state', 'year', 'actions'];

  constructor(private http: HttpClient) {
    this.apiBookEndpoint = environment.apiBookEndpoint;
  }

  getBookItems(): Observable<BookItem[]> {
    return this.http.get<BookItem[]>(this.apiBookEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
