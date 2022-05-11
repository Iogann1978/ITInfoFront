import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Tag} from "../model/tag";
import {TagService} from "./tag.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tag: Tag = {tag: ''};
  tagFormGroup: FormGroup;

  constructor(
    private tagService: TagService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.tagFormGroup = new FormGroup({
      'tagCtrl': new FormControl(null, Validators.required)
    });
    this.tagFormGroup.get('tagCtrl').valueChanges.subscribe(tag => this.tag.tag = tag);
  }

  delete() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.tagService.deleteTag(this.tag.tag);
      }
    });
  }

  save() {
    if (this.tagFormGroup.valid) {
      this.tagService.saveTag(this.tag);
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }
}
