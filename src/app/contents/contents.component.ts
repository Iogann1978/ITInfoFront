import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Content} from "../model/content";
import {ContentsService} from "./contents.service";

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit, OnDestroy {
  contents: Content;
  paramMap: Subscription;

  constructor(
    private contentsService: ContentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.contents = {id: null, text: null};
  }

  selectContentsFile(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.contentsService.postContent(this.contents.id, file);
    }
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.contentsService.getContent(id).subscribe(contents => this.contents = contents);
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }}
