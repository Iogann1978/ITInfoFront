import { Injectable } from '@angular/core';
import {BookItem} from "../model/book-item";
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiBookEndpoint: string = '';
  apiBookEndpointId: string = '';

  private displayedColumns: string[] = ['title', 'publisher', 'pages', 'rate', 'state', 'year', 'actions'];

  constructor(private http: HttpClient) {
    this.apiBookEndpoint = environment.apiBookEndpoint;
    this.apiBookEndpointId = environment.apiBookEndpointId;
  }

  getBookItems(): Observable<BookItem[]> {
    return this.http.get<BookItem[]>(this.apiBookEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  deleteBook(bookId: number): Observable<HttpResponse<Object>> {
    return this.http.delete(this.apiBookEndpointId.replace(':id', `${bookId}`), {observe: 'response'});
  }
}
