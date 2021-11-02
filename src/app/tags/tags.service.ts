import { Injectable } from '@angular/core';
import {Publisher} from "../model/publisher";
import {Tag} from "../model/tag";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private ELEMENT_DATA: Tag[] = [
    {id: 1, tag: 'Java'},
    {id: 2, tag: 'JavaScript'}
  ];
  private displayedColumns: string[] = ['tag'];

  constructor() { }

  getTags(): Tag[] {
    return this.ELEMENT_DATA;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
