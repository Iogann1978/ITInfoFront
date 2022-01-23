import {Component, OnDestroy, OnInit} from '@angular/core';
import {DescriptService} from "./descript.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-descript',
  templateUrl: './descript.component.html',
  styleUrls: ['./descript.component.css']
})
export class DescriptComponent implements OnInit, OnDestroy {
  descript: string = '';
  paramMap: Subscription;

  constructor(
    private descriptService: DescriptService,
    private activatedRoute: ActivatedRoute
    ) {
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

}
