import {Component, OnDestroy, OnInit} from '@angular/core';
import {DescriptService} from "./descript.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Descript} from "../model/descript";

@Component({
  selector: 'app-descript',
  templateUrl: './descript.component.html',
  styleUrls: ['./descript.component.css']
})
export class DescriptComponent implements OnInit, OnDestroy {
  descript: Descript;
  paramMap: Subscription;

  constructor(
    private descriptService: DescriptService,
    private activatedRoute: ActivatedRoute
    ) {
    this.descript = {id: null, name: null, text: null, infoId: null};
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.descriptService.getDescript(id).subscribe(descript => {
        this.descript = descript;
        this.descript.text = this.descriptService.decodeBase64(descript.text);
      });
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }
}
