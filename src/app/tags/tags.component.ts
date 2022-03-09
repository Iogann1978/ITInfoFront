import {Component, OnInit, ViewChild} from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../model/tag";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
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
  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('tagsPaginator') tagsPaginator: MatPaginator;

  constructor(
    private tagsService: TagsService,
    private dialog: MatDialog
    ) {
    this.displayedColumns = tagsService.getDisplayedColumns();
  }

  delete(tag: string) {
    this.deleteDialogRef = this.dialog.open(DeleteDialogComponent);
    this.deleteDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.tagsService.deleteTag(tag);
      }
      this.deleteDialogRef = null;
    });
  }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.tagsPaginator;
    });
  }
}
