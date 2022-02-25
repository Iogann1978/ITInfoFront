import { Injectable } from '@angular/core';
import {Publisher} from "../model/publisher";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private displayedColumns: string[] = ['name', 'actions'];
  apiPublishersEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiPublishersEndpoint = environment.apiPublishersEndpoint;
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiPublishersEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
