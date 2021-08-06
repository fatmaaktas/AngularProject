import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonService } from 'src/app/db/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: []
})
export class TutorialsListComponent implements OnInit {
  tutorials: any;
  form!: FormGroup
  hidden: boolean = false;

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
        console.log(res);

        this.tutorials = res;

      })
  }

  
  submit() {
    this.commonSvc.setData
      (`tutorials`,
        `${Date.now().valueOf()}`,
        {
          name: this.form.value.name,
          surName: this.form.value.surName
        }).then(() => {
          this.form.reset()
        })
  }



  hideBtn() {
    this.hidden = !this.hidden

  }

  deleteBtn(){
    this.tutorials.delete()
  
   
  }
  

}
