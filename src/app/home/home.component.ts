import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appName: any;
  appRoom: any;
  addDoc: any;
  saveDoc: any;
  listtab:any;
  operationtab:any;
  list:any;
  watt:any;
  meta:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.appName = "";
    this.appRoom = "";
    this.watt=0;
    this.saveDoc = false;
    this.listtab=false;
    this.operationtab=false;
    this.get();
  }

  save() {
    console.log(this.appName);
    console.log(this.appRoom);
    this.api.add(this.appName, this.appRoom,this.watt).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if(response.status==true){
          this.addDoc = response;
          this.saveDoc = true;
          }
          else
          {
            alert(response.message);
          }
        }
      }
    )

  }

  get()
  {
    this.api.get(3).subscribe(
      (response)=>{
        if(response.status==true)
        {
        console.log(response);
        this.list=response;
        this.meta=response.meta;
        }
        else{
          alert(response.message);
        }
      }
    )
  }
  addclick()
  {
    this.listtab=false;
    this.operationtab=false;
  }
  selectlist()
  {
    this.listtab=true;
    this.operationtab=false;
   
  }
  selectoperations()
  {
    this.operationtab=true;
    this.listtab=false;

  }

}
