import {Component, OnInit, ViewChild} from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../model/tag";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [TagsService]
})
export class TagsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Tag> = new MatTableDataSource<Tag>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('tagsPaginator') tagsPaginator: MatPaginator;

  constructor(
    private tagsService: TagsService,
    private dialog: MatDialog
    ) {
    this.displayedColumns = tagsService.getDisplayedColumns();
    this.tagsService.getTags().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.tagsPaginator;
    });
  }

  delete(tag: string) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.tagsService.deleteTag(tag);
      }
    });
  }

  ngOnInit(): void {
  }
}
