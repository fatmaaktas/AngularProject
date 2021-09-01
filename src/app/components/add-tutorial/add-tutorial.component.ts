import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: []
})
export class AddTutorialComponent implements OnInit {

  n: any
  x: any = []

  constructor() {}

  ngOnInit(): void {
  }
  submit() {}

  hesapla() {
    this.x = []

    for (let n = 2; n < 1000 ; n++) {
      let y: any = n
      let step = 0;
      let flag = true;
      while (y != 1) {
        if (y % 2 == 0 && y != 1) {
          y = y / 2
          let item = this.x.find((i: any) => i.number == y)
          step++
          if (item != undefined ) {
            item = this.x.push({ number: n, step: step + item.step })
            y=1
            flag=false;
          }

        }

        else if(y % 2 != 0 && y != 1) {
          y = (y * 3) + 1
          let item = this.x.find((i: any) => i.number == y)
          step++
          if (item != undefined) {
            item = this.x.push({ number: n, step: step + item.step })
            y=1
            flag = false;
          }
        }
      }
      if(flag)
      this.x.push({ number: n, step: step })
    }
    console.log(this.x);

  }

}
