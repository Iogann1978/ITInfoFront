import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoFile} from "../model/info-file";
import {ActivatedRoute} from "@angular/router";
import {FileService} from "./file.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit, OnDestroy {
  file: InfoFile;
  paramMap: Subscription;
  fileFormGroup: FormGroup;

  constructor(
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.fileFormGroup = new FormGroup({
      'fileNameCtrl': new FormControl(null, Validators.required),
      'fileSizeCtrl': new FormControl(null, Validators.required)
    });
    this.fileFormGroup.get('fileNameCtrl').valueChanges.subscribe(fileName => this.file.filename = fileName);
    this.fileFormGroup.get('fileSizeCtrl').valueChanges.subscribe(fileSize => this.file.size = fileSize);
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.fileService.getFile(id).subscribe(file => {
        this.file = file;
        this.fileFormGroup.get('fileNameCtrl').setValue(this.file.filename);
        this.fileFormGroup.get('fileSizeCtrl').setValue(this.file.size);
      });
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

  delete() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.fileService.deleteFile(this.file.id);
      }
    });
  }

  save() {
    if (this.fileFormGroup.valid) {
      this.fileService.saveFile(this.file);
    }
  }

  refreshData(id: number) {

  }
}
