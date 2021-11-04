import { Component, OnInit } from '@angular/core';
import {TagsService} from "./tags.service";
import {Tag} from "../model/tag";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [TagsService]
})
export class TagsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Tag[] = [];

  constructor(private tagsService: TagsService) {
    this.displayedColumns = tagsService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(data => this.dataSource = data);
  }
}
