import { Injectable } from '@angular/core';
import {InfoFile} from "../model/info-file";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  displayedColumns: string[] = ['filename', 'size', 'actions'];
  apiFileEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiFileEndpoint = environment.apiFileEndpoint;
  }

  getFiles(): Observable<InfoFile[]> {
    return this.http.get<InfoFile[]>(this.apiFileEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
