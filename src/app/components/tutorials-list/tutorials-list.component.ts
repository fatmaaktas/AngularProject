import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonService } from 'src/app/db/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: []
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  form!: FormGroup
  hidden: boolean = false;
  deger: boolean = true;
  selectedKey:any;


  constructor(
    private commonSvc: CommonService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      surName: ['', Validators.compose([Validators.required])]
    })
  }


  ngOnInit(): void {

    this.commonSvc.getListWithKey('tutorials')
      .subscribe(res => {
        this.tutorials = res;
      })
  }

  letterOnly(event: any) {
    var charCode = event.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57))
  }

  submit() {
    if(this.deger)
      this.saveRecord()
    
    else
      this.updateRecord()
    
    this.deger= !this.deger
    this.form.reset()
  }

  saveRecord(){
    this.commonSvc.setData
    (`tutorials`,
      `${Date.now().valueOf()}`,
      {
        name: this.form.value.name,
        surName: this.form.value.surName
      })
  }

  updateRecord(){
    this.commonSvc.updateData
    (`tutorials`,
      `${this.selectedKey}`,
      {
        name: this.form.value.name,
        surName: this.form.value.surName
      })
  }


  hideBtn() {
    this.hidden = !this.hidden
  }

  deleteRecord(key: any) {
    this.commonSvc.removeData(`tutorials/${key}`)
  }

  setRecord(name: any, surName: any, key:any) {
    this.deger= !this.deger
    this.selectedKey = key
    this.form.setValue({
      name: name,
      surName: surName,
      })
    
  }


}

