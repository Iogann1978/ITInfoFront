import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-descript-dialog',
  templateUrl: './descript-dialog.component.html',
  styleUrls: ['./descript-dialog.component.css']
})
export class DescriptDialogComponent implements OnInit {
  descriptFormGroup: FormGroup;
  name: string;
  formData: FormData;

  constructor(
    private dialogRef: MatDialogRef<DescriptDialogComponent>
  ) {
    this.descriptFormGroup = new FormGroup({
      'titleCtrl': new FormControl(null, Validators.required),
      'fileCtrl': new FormControl(null)
    });
    this.descriptFormGroup.get('titleCtrl').valueChanges.subscribe(name => this.name = name);
    this.formData = new FormData();
  }

  ngOnInit(): void {
  }

  close(flag: boolean) {
    if (!flag) {
      this.formData = null;
    }
    this.dialogRef.close(this.formData);
  }

  selectDescriptFile(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append('file', file, this.name);
      this.descriptFormGroup.get('fileCtrl').setValue(file.name);
    }
  }
}
