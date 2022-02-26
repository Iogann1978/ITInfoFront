import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Descript} from "../model/descript";

@Injectable({
  providedIn: 'root'
})
export class DescriptService {
  apiDescriptEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiDescriptEndpoint = environment.apiDescriptEndpoint;
  }

  getDescript(bookId: number): Observable<Descript> {
    if (bookId < 0) {
      return of({id: null, text: null});
    } else {
      return this.http.get<Descript>(this.apiDescriptEndpoint.replace(':id',`${bookId}`));
    }
  }

  postDescript(id: number, file: File) {
    const formData = new FormData();
    formData.append("thumbnail", file);
    const upload = this.http.post(this.apiDescriptEndpoint.replace(':id',`${id}`), formData);
    upload.subscribe();
  }
}
