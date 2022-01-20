import { Injectable } from '@angular/core';
import {Author} from "../model/author";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  displayedColumns: string[] = ['name', 'actions'];
  apiAuthorEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiAuthorEndpoint = environment.apiAuthorEndpoint;
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiAuthorEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
