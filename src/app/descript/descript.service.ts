import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DescriptService {
  apiDescriptEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiDescriptEndpoint = environment.apiDescriptEndpoint;
  }

  getDescript(bookId: number): Observable<string> {
    if (bookId < 0) {
      return of('');
    } else {
      return this.http.get<string>(this.apiDescriptEndpoint.replace(':id',`${bookId}`));
    }
  }
}
