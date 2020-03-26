import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list;
  listdata: any;
  meta:any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.get();

  }

  update(id, e) {
    var status = null;
    if (e.target.checked) {
      status = 1;
    }
    else {
      status = 0;
    }
    this.api.operate(id, status).subscribe(
      (response) => {
      if(response.status==true)
      {
        this.get();
        
      }
      else{
        alert(response.message);
      }        


      }
    )

  }
  get() {
    this.api.get(3).subscribe(
      (response) => {
        if(response.status==true)
        {
          console.log(response);
          this.meta=response.meta;
          
        this.listdata = response.doc;
        }
        else
        {
          alert(response.message);
        }
      }
    )
  }

}
