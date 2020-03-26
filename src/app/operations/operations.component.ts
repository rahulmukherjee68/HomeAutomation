import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  @Input() list;
  listdata: any;
  active: any;
  unactive: any;
  delete: any;
  editId: any;
  appName: any;
  appRoom: any;
  search: any;
  searchDevice: any;
  searchRoom: any;
  watt: any;
  skey: any;
  searchlist: any;
  editdoc: any;
  noSearchData: any;
  meta: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.active = false;
    this.unactive = false;
    this.delete = false;
    this.search = false;
    this.searchDevice = false;
    this.searchRoom = false;
    this.searchlist = false;
    this.editdoc = false;
    this.noSearchData = false;
    this.meta = 0;
    //console.log(this.listdata);

  }

  selectActive() {
    this.active = true;
    this.unactive = false;
    this.delete = false;
    this.search = false;
    this.searchlist = false;
    this.getActive();

  }
  selectUnActive() {
    this.active = false;
    this.unactive = true;
    this.delete = false;
    this.search = false;
    this.searchlist = false;
    this.getUnActive();
  }
  selectDelete() {
    this.active = false;
    this.unactive = false;
    this.search = false;
    this.delete = true;
    this.searchlist = false;
    this.get();
  }

  selectSearch() {
    this.active = false;
    this.unactive = false;
    this.delete = false;
    this.search = true;
    this.searchlist = false;
  }
  getActive() {
    this.api.get(1).subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.meta = response.meta;

          this.listdata = response.doc;
        }
        else {
          alert(response.message);
        }
      }
    )
  }
  getUnActive() {
    this.api.get(0).subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.meta = response.meta;
          this.listdata = response.doc;
        }
        else {
          alert(response.message);
        }
      }
    )
  }
  get() {
    this.api.get(3).subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.meta = response.meta;
          this.listdata = response.doc;
        }
        else {
          alert(response.message);
        }
      }
    )
  }

  editById(id, room, device, watt) {
    this.editId = id;
    this.appRoom = room;
    this.appName = device;
    this.watt = watt;
    this.searchlist = false;
    this.editdoc=false;
    console.log(this.editId);

  }
  edit() {
    this.editdoc = false;
    if (this.appName == "" && this.appRoom == "") {
      alert("Device and Room name is required!")
    }
    else {

      const myobj = {
        _id: this.editId,
        device: this.appName,
        room: this.appRoom,
        watt: this.watt
      }
      this.api.edit(myobj).subscribe(
        (response) => {
          if (response.status == true) {
            this.editdoc = true;
            this.appRoom="";
            this.appName="";
            this.watt="";
            this.get();
          }
          else {
            alert(response.message);
          }

        }
      );
    }
  }

  update(id, e, page) {
    var status = null;
    if (e.target.checked) {
      status = 1;
    }
    else {
      status = 0;
    }
    this.api.operate(id, status).subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          if (page === 'active') {
            this.getActive()
          }
          else if (page === 'unactive') {
            this.getUnActive();
          }
          else {
            this.get();
          }
        }
        else {
          alert(response.message);
        }


      }
    )

  }
  deleteById(id) {
    this.api.delete(id).subscribe(
      (response) => {

        if (response.status == true) {
          this.get();
        }
        else {
          alert(response.message);
        }
      }
    );
  }
  selectsearchDevice() {
    this.searchDevice = true;
    this.searchRoom = false;
    this.searchlist = false;

  }
  selectsearchRoom() {
    this.searchRoom = true;
    this.searchDevice = false;
    this.searchlist = false;

  }
  searchByKey(param) {
    console.log(this.skey);
    console.log(param);

    this.api.search(this.skey, param).subscribe(
      (response) => {
        this.meta = response.meta;
        console.log(response);

        if (response.status == true) {
          if (response.doc.length == 0) {
            this.noSearchData = true;
            this.listdata=[];
          }
          else {
            this.noSearchData = false;
            this.searchlist = true;
            this.listdata = response.doc;
          }
        }
        else {
          alert(response.message);
        }

      }
    );


  }
  editChange(){
    this.editdoc=false;
  }


}
