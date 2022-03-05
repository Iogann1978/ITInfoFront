import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Tag} from "../model/tag";
import {map} from "rxjs/operators";
import {BookItem} from "../model/book-item";
import {TagsService} from "../tags/tags.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiGoogleEndpoint: string = '';
  apiBookEndpointId: string = '';

  constructor(private http: HttpClient, private tagsService: TagsService) {
    this.apiGoogleEndpoint = environment.apiGoogleEndpoint;
    this.apiBookEndpointId = environment.apiBookEndpointId;
  }

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
      return this.http.get<BookItem>(this.apiBookEndpointId.replace(':id', `${bookId}`))
        .pipe(
          map((book: BookItem) => book.tags),
          map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
        );
    }
  }

  getBook(bookId: number): Observable<BookItem> {
    if (bookId < 0) {
      return of({id: null, isbn: null, pages: null, authors: [], title: null, year: null, rate: null, state: null, publisher: {id: null, name: null}, file: {id: null, filename: null, size: null}, tags: [], content: {id: null, text: null}, descript: {id: null, text: null}});
    } else {
      return this.http.get<BookItem>(this.apiBookEndpointId.replace(':id', `${bookId}`));
    }
  }

  getGoogle(isbn: string): Observable<BookItem> {
    return this.http.get<BookItem>(this.apiGoogleEndpoint.replace(':isbn', `${isbn}`));
  }
 }
