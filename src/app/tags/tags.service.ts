import { Injectable } from '@angular/core';
import {Tag} from "../model/tag";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private displayedColumns: string[] = ['tag'];

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('./assets/tags.json');
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
