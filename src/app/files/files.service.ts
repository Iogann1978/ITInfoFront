import { Injectable } from '@angular/core';
import {InfoFile} from "../model/info-file";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private displayedColumns: string[] = ['filename', 'size', 'actions'];

  constructor(private http: HttpClient) { }

  getFiles(): Observable<InfoFile[]> {
    return this.http.get<InfoFile[]>('./assets/files.json');
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
