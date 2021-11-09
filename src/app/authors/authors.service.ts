import { Injectable } from '@angular/core';
import {Author} from "../model/author";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private displayedColumns: string[] = ['name', 'actions'];

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>('./assets/authors.json');
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
