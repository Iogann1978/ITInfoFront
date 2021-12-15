import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InfoFile} from "../model/info-file";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFile(fileId: number): Observable<InfoFile> {
    let params = new HttpParams();
    params.append('id', fileId);
    return this.http.get<InfoFile>('./assets/file.json', {params: params});
  }
}
