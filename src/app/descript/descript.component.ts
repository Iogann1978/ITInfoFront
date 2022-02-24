import {Component, OnDestroy, OnInit} from '@angular/core';
import {DescriptService} from "./descript.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {InfoFile} from "../model/info-file";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-descript',
  templateUrl: './descript.component.html',
  styleUrls: ['./descript.component.css']
})
export class DescriptComponent implements OnInit, OnDestroy {
  descript: string = '';
  paramMap: Subscription;
  descriptFile: InfoFile;
  descriptFormGroup: FormGroup;

  constructor(
    private descriptService: DescriptService,
    private activatedRoute: ActivatedRoute
    ) {
  }

  selectDescriptFile(event) {
    this.descriptFile.filename = event.target.files[0].name;
    this.descriptFile.size = event.target.files[0].size;
    this.descriptFormGroup.get('descriptFileCtrl').setValue(this.descriptFile.filename);
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.descriptService.getDescript(id).subscribe(descript => this.descript = descript);
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

  onSubmit(): void {
  }

}
