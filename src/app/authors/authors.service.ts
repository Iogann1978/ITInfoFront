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
  apiAuthorsEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiAuthorsEndpoint = environment.apiAuthorsEndpoint;
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiAuthorsEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
