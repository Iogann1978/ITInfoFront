import { Injectable } from '@angular/core';
import {Publisher} from "../model/publisher";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private displayedColumns: string[] = ['name'];

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>('./assets/publishers.json');
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
