import {Component, OnInit, ViewChild} from '@angular/core';
import {InfoFile} from "../model/info-file";
import {FilesService} from "./files.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [FilesService]
})
export class FilesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<InfoFile> = new MatTableDataSource<InfoFile>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('filesPaginator') filesPaginator: MatPaginator;

  constructor(private filesService: FilesService) {
    this.displayedColumns = filesService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.filesService.getFiles().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.filesPaginator;
    });
  }
}
