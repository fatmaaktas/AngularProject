import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonService } from 'src/app/db/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { errorObject } from 'rxjs/internal-compatibility';


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

  letterOnly(event: any) {
    var charCode = event.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57))
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

  deleteRecord(key:any){
    this.commonSvc.removeData(`tutorials/${key}`)
  }

  updateRecord(key: any){
    this.commonSvc.updateData('tutorials',`${key}`,{
      name:'',
      surName:''
     })
  }
 
  
}
  