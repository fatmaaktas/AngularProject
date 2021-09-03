import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/db/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products : any = []

  constructor(private commonSvc : CommonService) { }


  ngOnInit(): void {
    this.commonSvc.getListWithKey("products").subscribe(response=>{
      this.products = response
      console.log(response)
    })
  }

}
