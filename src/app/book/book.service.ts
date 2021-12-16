import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Tag} from "../model/tag";
import {map} from "rxjs/operators";
import {BookItem} from "../model/book-item";
import {TagsService} from "../tags/tags.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private tagsService: TagsService) { }

  getTags(): Observable<string[]> {
    return this.tagsService.getTags()
      .pipe(
        map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
      );
  }

  getBookTags(bookId: number): Observable<string[]> {
    if (bookId < 0) {
      return null;
    } else {
      let params = new HttpParams();
      params.append('id', bookId);
      return this.http.get<BookItem>('./assets/book.json', {params: params})
        .pipe(
          map((book: BookItem) => book.tags),
          map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
        );
    }
  }

  getBook(bookId: number): Observable<BookItem> {
    if (bookId < 0) {
      return of({id: null, isbn: null, pages: null, authors: [], title: null, year: null, rate: null, state: null, publisher: null, file: null, tags: null});
    } else {
      let params = new HttpParams();
      params.append('id', bookId);
      return this.http.get<BookItem>('./assets/book.json', {params: params});
    }
  }
}
