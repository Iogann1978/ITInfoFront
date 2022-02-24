import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InfoFile} from "../model/info-file";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  apiFileEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiFileEndpoint = environment.apiFileEndpoint;
  }

  getFile(fileId: number): Observable<InfoFile> {
    return this.http.get<InfoFile>(this.apiFileEndpoint.replace(':id', `${fileId}`));
  }
}
