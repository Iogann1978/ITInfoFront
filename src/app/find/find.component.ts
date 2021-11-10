import { Component, OnInit } from '@angular/core';
import {FindService} from "./find.service";

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  authors: string[];
  author: string;
  tags: string[];
  tag: string;
  publishers: string[];
  publisher: string;

  constructor(private findService: FindService) {
    this.findService.getAuthors().subscribe(data => this.authors = data);
    this.findService.getTags().subscribe(data => this.tags = data);
    this.findService.getPublishers().subscribe(data => this.publishers = data);
  }

  ngOnInit(): void {
  }

}
