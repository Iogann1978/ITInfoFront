import { Injectable } from '@angular/core';
import {InfoFile} from "../model/info-file";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private ELEMENT_DATA: InfoFile [] = [
    {id: 1, filename: '1.txt', size: 567},
    {id: 2, filename: '2.txt', size: 754}
  ];
  private displayedColumns: string[] = ['filename', 'size'];

  constructor() { }

  getFiles(): InfoFile[] {
    return this.ELEMENT_DATA;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
