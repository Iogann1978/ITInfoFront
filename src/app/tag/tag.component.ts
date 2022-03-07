import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Tag} from "../model/tag";
import {TagService} from "./tag.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {
  tag: Tag = {tag: null};
  paramMap: Subscription;
  tagFormGroup: FormGroup;

  constructor(
    private tagService: TagService,
    private activatedRoute: ActivatedRoute
  ) {
    this.tagFormGroup = new FormGroup({
      'tagCtrl': new FormControl(null, Validators.required)
    });
    this.tagFormGroup.get('tagCtrl').valueChanges.subscribe(tag => this.tag.tag = tag);
  }

  delete() {
    this.tagService.deleteTag(this.tag.tag);
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let tag = params.get('tag');
      if (tag !== undefined && tag !== null && tag.trim().length > 0) {
        this.tag.tag = tag;
        this.tagFormGroup.get('tagCtrl').setValue(this.tag.tag);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

  onSubmit(): void {
    this.tagService.saveTag(this.tag);
  }
}
