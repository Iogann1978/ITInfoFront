import { Injectable } from '@angular/core';
import {AuthorsService} from "../authors/authors.service";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {map} from "rxjs/operators";
import {TagsService} from "../tags/tags.service";
import {Tag} from "../model/tag";
import {PublishersService} from "../publishers/publishers.service";
import {Publisher} from "../model/publisher";

@Injectable({
  providedIn: 'root'
})
export class FindService {

  constructor(
    private authorsService: AuthorsService,
    private tagsService: TagsService,
    private publishersService: PublishersService
  ) { }

  getAuthors(): Observable<string[]> {
    return this.authorsService.getAuthors().pipe(
      map((data: Author[]) => data.map((author: Author) => author.name))
    );
  }

  getTags(): Observable<string[]> {
    return this.tagsService.getTags().pipe(
      map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
    );
  }

  getPublishers(): Observable<string[]> {
    return this.publishersService.getPublishers().pipe(
      map((data: Publisher[]) => data.map((publisher: Publisher) => publisher.name))
    );
  }
}
