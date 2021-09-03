import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/db/common.service';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: []
})
export class TutorialDetailsComponent implements OnInit {

  public items: CartItem[] = [];
  public cartCount: number = 0;
  public total: number = 0;
  form!: FormGroup
  products:any;

  addItem(product: Product, quantity: number = 1) {
    let item = this.items.find(i => i.product.id == product.id);
    if (item != undefined) {
      item.quantity += quantity;
    }
    else {
      //this.items.push(new CartItem(product))
    }
  }
  constructor(
    private commonSvc: CommonService,
    private router: Router,
    private fb: FormBuilder) { this.form = this.fb.group({}) }


  ngOnInit(): void {

  }

  ayakkabi(){
    // this.commonSvc.getData('products/key1')
    //   .subscribe(res => {
        
    //   }) 
  }

  getProducts() {
    this.commonSvc.getListWithKey('products').subscribe(res => {
      console.log(res);
    })

    // this.commonSvc.getData('products/key1')
    //   .subscribe(res => {
    //     console.log(res);
    //   })
  }
}
class CartItem {
  constructor(
    public product: Product,
    public quantity: number) { }

}