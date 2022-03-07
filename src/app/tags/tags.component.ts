import {Component, OnInit, ViewChild} from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../model/tag";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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

  constructor(private tagsService: TagsService) {
    this.displayedColumns = tagsService.getDisplayedColumns();
  }

  delete(tag: string) {
    this.tagsService.deleteTag(tag);
  }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.tagsPaginator;
    });
  }
}
