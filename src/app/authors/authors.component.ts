import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthorsService} from "./authors.service";
import {Author} from "../model/author";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [AuthorsService]
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Author> = new MatTableDataSource<Author>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('authorsPaginator') authorsPaginator: MatPaginator;

  constructor(
    private authorsService: AuthorsService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = authorsService.getDisplayedColumns();
  }

  delete(tag: string) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.authorsPaginator;
    });
  }
}
