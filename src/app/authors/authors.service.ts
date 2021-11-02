import { Injectable } from '@angular/core';
import {Author} from "../model/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private ELEMENT_DATA: Author[] = [
    {id: 1, name: 'Joshua'},
    {id: 2, name: 'Felix'}
  ];
  private displayedColumns: string[] = ['name'];

  constructor() { }

  getAuthors(): Author[] {
    return this.ELEMENT_DATA;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
