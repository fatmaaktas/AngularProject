import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/db/common.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetail : any = []
  variant : any;
  renk: unknown;
  form!: FormGroup;
  products: any=[]
  constructor(
    private commonSvc : CommonService, 
    private activatedRoute: ActivatedRoute)
   { }
  

  ngOnInit(): void {
    this.getVariantName()
    // this.activatedRoute.params.subscribe(params=>{
      
    //   this.commonSvc.getDataId('products',params['id']).subscribe(res=>{
    //     this.productDetail = res;
    //   console.log(res)
    // })
    // })
    
  }

  formInput =  new FormGroup({
    title : new FormControl("")
  })
  getVariantName(){
    this.commonSvc.getProductVariantsName(`products/key4/variants`).subscribe((res: any)=>{
      
      const arrayUniqueByKey = [...new Map(res.map((item:any) =>
        [item['name'], item])).values()];
      console.log(arrayUniqueByKey);
      
      
    })
      
  }



}
