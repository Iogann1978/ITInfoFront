import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Descript} from "../model/descript";

@Injectable({
  providedIn: 'root'
})
export class DescriptService {
  apiDescriptEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiDescriptEndpointId = environment.apiDescriptEndpointId;
  }

  getDescript(bookId: number): Observable<Descript> {
    if (bookId < 0) {
      return of({id: null, name: null, text: null});
    } else {
      return this.http.get<Descript>(this.apiDescriptEndpointId.replace(':id',`${bookId}`));
    }
  }

  postDescript(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const upload = this.http.post(this.apiDescriptEndpointId.replace(':id',`${id}`), formData);
    upload.subscribe();
  }
}
