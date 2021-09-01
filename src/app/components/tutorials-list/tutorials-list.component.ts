import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonService } from 'src/app/db/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: []
})
export class TutorialsListComponent implements OnInit {

  tutorials: any = [];
  form!: FormGroup
  hidden: boolean = false;
  deger: boolean = true;
  query: any;
  selectedKey: any;
  batch: number = 10
  lastkey: string = ' '
  isLoaded: boolean = false



  constructor(
    private commonSvc: CommonService,
    private router: Router,
    private fb: FormBuilder) {
    this.isLoaded = false
    this.lastkey = ' '
    this.getListUrl(this.lastkey)
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      surName: ['', Validators.compose([Validators.required])]
    })
  }


  ngOnInit(): void {    
  
    this.commonSvc.getListWithKey('tutorials').subscribe(res=>{
      console.log(res);
      
    })
  }

  letterOnly(event: any) {
    var charCode = event.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57))
  }

  submit() {
    if (this.form.valid) {
      if (this.deger)
        this.saveRecord()
      else
        this.updateRecord()

      this.deger = !this.deger
      this.form.reset()
    }
    this.updateRecord();
    this.getListUrl();
  }

  saveRecord() {
    this.commonSvc.setData
      (`tutorials`,
        `${Date.now().valueOf()}`,
        {
          name: this.form.value.name,
          surName: this.form.value.surName
        })
        this.updateRecord();
  }

  updateRecord() {
    this.commonSvc.updateData
      (`tutorials`,
        `${this.selectedKey}`,
        {
          name: this.form.value.name,
          surName: this.form.value.surName
        })
  }


  // hideBtn() {
  //   this.hidden = !this.hidden
  // }

  deleteRecord(key: any) {
    this.commonSvc.removeData(`tutorials/${key}`),
    this.getListUrl();
  }

  setRecord(name: any, surName: any, key: any) {
    this.deger = !this.deger
    this.selectedKey = key
    this.form.setValue({
      name: name,
      surName: surName,
    })

  }

  getListUrl(lastkey?: string) {
    this.commonSvc.getListUrl(this.batch + 1, lastkey)
      .subscribe((res: any) => {
        this.tutorials = this.tutorials.slice(0, -1).concat(res)
        this.lastkey = lastkey == res.slice(-1)[0].key ? 'finish' : res.slice(-1)[0].key
        this.isLoaded = true
      })
  }
  onScroll() {
    if (this.lastkey != 'finish') {
      this.getListUrl(this.lastkey)
    }
  }

}
