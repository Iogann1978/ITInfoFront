import { Injectable } from '@angular/core';
import {Tag} from "../model/tag";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  displayedColumns: string[] = ['tag', 'actions'];
  apiTagEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiTagEndpoint = environment.apiTagEndpoint;
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiTagEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
