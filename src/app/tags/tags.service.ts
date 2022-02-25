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
  apiTagsEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiTagsEndpoint = environment.apiTagsEndpoint;
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiTagsEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
