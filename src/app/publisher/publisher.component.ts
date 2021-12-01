import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PublisherService} from "./publisher.service";
import {Publisher} from "../model/publisher";
import {Subscription} from "rxjs";

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
    private activatedRoute: ActivatedRoute
  ) {
    this.publisherFormGroup = new FormGroup({
      'nameCtrl': new FormControl(null, Validators.required)
    });
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
}
