import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Author} from "../model/author";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "./author.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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

  delete() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  save() {
    if (this.authorFormGroup.valid) {
      this.authorService.saveAuthor(this.author).subscribe(response => this.router.navigate(['/home/3']));
    }
  }
}
