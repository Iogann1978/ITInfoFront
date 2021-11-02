import { Injectable } from '@angular/core';
import {Publisher} from "../model/publisher";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private ELEMENT_DATA: Publisher[] = [
    {id: 1, name: 'O`Reily'},
    {id: 2, name: 'Pack'}
  ];
  private displayedColumns: string[] = ['name'];

  constructor() { }

  getPublishers(): Publisher[] {
    return this.ELEMENT_DATA;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
