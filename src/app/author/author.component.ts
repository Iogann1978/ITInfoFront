import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Author} from "../model/author";
import {ActivatedRoute} from "@angular/router";
import {AuthorService} from "./author.service";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  author: Author;
  paramMap: Subscription;
  authorFormGroup: FormGroup;

  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authorFormGroup = new FormGroup({
      'authorCtrl': new FormControl(null, Validators.required)
    });
    this.authorFormGroup.get('authorCtrl').valueChanges.subscribe(author => this.author.name = author);
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.authorService.getAuthor(id).subscribe(author => {
        this.author = author;
        this.authorFormGroup.get('authorCtrl').setValue(this.author.name);
      });
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

  onSubmit(): void {
    if (this.authorFormGroup.valid) {
      console.log("author: " + this.author);
    }
  }
}
