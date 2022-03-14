import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PublisherService} from "./publisher.service";
import {Publisher} from "../model/publisher";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit, OnDestroy {
  publisher: Publisher;
  paramMap: Subscription;
  publisherFormGroup: FormGroup;

  constructor(
    private publisherService: PublisherService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.publisherFormGroup = new FormGroup({
      'nameCtrl': new FormControl(null, Validators.required)
    });
    this.publisherFormGroup.get('nameCtrl').valueChanges.subscribe(name => this.publisher.name = name);
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.publisherService.getPublisher(id).subscribe(publisher => {
        this.publisher = publisher;
        this.publisherFormGroup.get('nameCtrl').setValue(this.publisher.name);
      });
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

  delete() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.publisherService.deletePublisher(this.publisher.id);
      }
    });
  }

  save() {
    if (this.publisherFormGroup.valid) {
      this.publisherService.savePublisher(this.publisher);
    }
  }
}
