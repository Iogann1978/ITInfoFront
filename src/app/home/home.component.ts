import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  paramMap: Subscription;
  index: number;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.queryParamMap.subscribe(params => this.index = +params.get('index'));
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

}
