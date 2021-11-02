import { Component, OnInit } from '@angular/core';
import {InfoFile} from "../model/info-file";
import {FilesService} from "./files.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [FilesService]
})
export class FilesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: InfoFile[];

  constructor(private filesService: FilesService) {
    this.dataSource = filesService.getFiles();
    this.displayedColumns = filesService.getDisplayedColumns();
  }

  ngOnInit(): void {
  }

}
