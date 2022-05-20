import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Descript} from "../model/descript";

@Component({
  selector: 'app-descript-dialog',
  templateUrl: './descript-dialog.component.html',
  styleUrls: ['./descript-dialog.component.css']
})
export class DescriptDialogComponent implements OnInit {
  descriptFormGroup: FormGroup;
  descript: Descript = {id: null, name: null, text: null, infoId: null};

  constructor(
    private dialogRef: MatDialogRef<DescriptDialogComponent>
  ) {
    this.descriptFormGroup = new FormGroup({
      'titleCtrl': new FormControl(null, Validators.required),
      'fileCtrl': new FormControl(null)
    });
    this.descriptFormGroup.get('titleCtrl').valueChanges.subscribe(name => this.descript.name = name);
  }

  ngOnInit(): void {
  }

  close(flag: boolean) {
    if (!flag) {
      this.descript = null;
    }
    this.dialogRef.close(this.descript);
  }

  selectDescriptFile(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.descriptFormGroup.get('fileCtrl').setValue(file.name);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => {
        this.descript.text = btoa(event.target.result.toString());
      };
    }
  }
}
